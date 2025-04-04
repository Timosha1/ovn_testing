import { spawn } from 'child_process';
import * as http from 'http';
import * as client from 'prom-client';

// --- Prometheus Metrics Setup ---
const register = new client.Registry(); // Создаем экземпляр Registry, который будет содержать все собранные метрики.
client.collectDefaultMetrics({ register }); // Собираем автоматически собирает стандартные метрики Node.js, такие как использование CPU, памяти, количество открытых файловых дескрипторов и другие. Эти метрики регистрируются в созданном register.

const testStatusGauge = new client.Gauge({  // Gauge - это метрика, которая может увеличиваться и уменьшаться, представляя собой текущее значение.
  name: 'playwright_api_tests_last_run_status', // Имя метрики
  help: 'Status of the last Playwright API test run (1 = success, 0 = failure)',
  registers: [register], // Регистрируем метрику
});

// Устанавливаем начальное значение в 0 (неудача), пока тесты не пройдут успешно первый раз
testStatusGauge.set(0);

// --- Test Runner Function ---
async function runPlaywrightTests(): Promise<number> {
  console.log(`[${new Date().toISOString()}] Starting Playwright tests...`);
  return new Promise((resolve) => { // Асинхронная обработка результата выполнения тестов.
    // Используем npx для запуска команды из node_modules. Запуск всех тестов в проекте
    const testProcess = spawn('npx', ['playwright', 'test'], {
      stdio: 'inherit', // Наследуем stdin/stdout/stderr. Установка stdio: 'inherit' гарантирует, что весь вывод тестов Playwright будет виден в этих логах контейнера,
      shell: true // Использовать shell для npx (особенно важно в Windows). Без shell: true на Windows npx может не найти исполняемый файл playwright или столкнуться с другими проблемами при запуске. На Linux и macOS npx часто работает и без shell: true, но установка этой опции делает код более переносимым и надежным на разных платформах.
    });

    testProcess.on('error', (err) => {
      console.error(`[${new Date().toISOString()}] Failed to start Playwright process:`, err);
      resolve(0); // Считаем ошибку запуска как неудачу тестов
    });

    testProcess.on('close', (code) => {
      const status = code === 0 ? 1 : 0;
      console.log(`[${new Date().toISOString()}] Playwright tests finished with code ${code}. Setting status to ${status}.`);
      resolve(status); // Возвращаем 1 при успехе (exit code 0), иначе 0
    });
  });
}

// --- HTTP Metrics Server ---
const server = http.createServer(async (req, res) => { // HTTP-сервер. Функция обратного вызова обрабатывает каждый входящий запрос.
  if (req.url === '/metrics') {  // Это стандартный путь, по которому Prometheus запрашивает метрики.
    try {
      res.setHeader('Content-Type', register.contentType); // register.contentType - это свойство объекта register (экземпляра prom-client.Registry). Библиотека prom-client сама определяет правильный Content-Type для представления метрик Prometheus (обычно это text/plain; version=0.0.4; charset=utf-8). Эта строка устанавливает правильный заголовок, чтобы Prometheus мог корректно интерпретировать полученные метрики.
      res.end(await register.metrics()); // res.end() - это метод объекта res, который завершает отправку HTTP-ответа. Он может принимать один аргумент, который будет отправлен в теле ответа.
    } catch (ex) { // Ловим и логируем ошибки
      console.error("Error serving metrics:", ex);
      res.statusCode = 500;
      if (ex instanceof Error) {
        res.end(`Internal Server Error: ${ex.message}`);
      } else {
        res.end(`Internal Server Error: ${String(ex)}`);
      }
    }
  } else {
    res.statusCode = 404;
    res.end('Not Found. Try /metrics');
  }
});

const PORT = process.env.EXPORTER_PORT || 9100; // Порт для экспортера
const RUN_INTERVAL_MINUTES = 1; // Интервал запуска тестов

// --- Main Execution Logic ---
async function main() {
  console.log('Starting initial Playwright test run...');
  const initialStatus = await runPlaywrightTests(); // Запускаем тесты Playwright при старте и ожидаем их завершения.
  testStatusGauge.set(initialStatus); // Устанавливает значение метрики testStatusGauge на основе результата первого запуска тестов.
  console.log(`Initial test run status set to: ${initialStatus}`);

  // Запускаем HTTP сервер для метрик
  server.listen(PORT, () => {
    console.log(`Prometheus metrics exporter listening on port ${PORT}`);
  });

  // Устанавливаем интервал для периодического запуска тестов Playwright. Функция runPlaywrightTests будет вызываться каждые RUN_INTERVAL_MINUTES минут. Результат каждого запуска будет обновлять значение метрики testStatusGauge.
  setInterval(async () => {
    const status = await runPlaywrightTests();
    testStatusGauge.set(status);
  }, RUN_INTERVAL_MINUTES * 60 * 1000); // Переводим минуты в миллисекунды

  // Обработка сигналов для корректного завершения. Обработчик сигнала SIGTERM (сигнал завершения, обычно отправляемый при остановке контейнера). При получении этого сигнала сервер корректно завершает работу.
  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received. Shutting down gracefully.');
    server.close(() => {
      console.log('HTTP server closed.');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    console.log('SIGINT signal received. Shutting down gracefully.');
    server.close(() => {
      console.log('HTTP server closed.');
      process.exit(0);
    });
  });
}

// Вызывает функцию main и обрабатывает любые неперехваченные ошибки, которые могут возникнуть в процессе выполнения.
main().catch(error => {
  console.error("Unhandled error in main execution:", error);
  process.exit(1);
});