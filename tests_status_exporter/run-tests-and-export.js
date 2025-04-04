"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var http = require("http");
var client = require("prom-client");
// --- Prometheus Metrics Setup ---
var register = new client.Registry(); // Создаем экземпляр Registry, который будет содержать все собранные метрики.
client.collectDefaultMetrics({ register: register }); // Собираем автоматически собирает стандартные метрики Node.js, такие как использование CPU, памяти, количество открытых файловых дескрипторов и другие. Эти метрики регистрируются в созданном register.
var testStatusGauge = new client.Gauge({
    name: 'playwright_api_tests_last_run_status', // Имя метрики
    help: 'Status of the last Playwright API test run (1 = success, 0 = failure)',
    registers: [register], // Регистрируем метрику
});
// Устанавливаем начальное значение в 0 (неудача), пока тесты не пройдут успешно первый раз
testStatusGauge.set(0);
// --- Test Runner Function ---
function runPlaywrightTests() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log("[".concat(new Date().toISOString(), "] Starting Playwright tests..."));
            return [2 /*return*/, new Promise(function (resolve) {
                    // Используем npx для запуска команды из node_modules. Запуск всех тестов в проекте
                    var testProcess = (0, child_process_1.spawn)('npx', ['playwright', 'test'], {
                        stdio: 'inherit', // Наследуем stdin/stdout/stderr. Установка stdio: 'inherit' гарантирует, что весь вывод тестов Playwright будет виден в этих логах контейнера,
                        shell: true // Использовать shell для npx (особенно важно в Windows). Без shell: true на Windows npx может не найти исполняемый файл playwright или столкнуться с другими проблемами при запуске. На Linux и macOS npx часто работает и без shell: true, но установка этой опции делает код более переносимым и надежным на разных платформах.
                    });
                    testProcess.on('error', function (err) {
                        console.error("[".concat(new Date().toISOString(), "] Failed to start Playwright process:"), err);
                        resolve(0); // Считаем ошибку запуска как неудачу тестов
                    });
                    testProcess.on('close', function (code) {
                        var status = code === 0 ? 1 : 0;
                        console.log("[".concat(new Date().toISOString(), "] Playwright tests finished with code ").concat(code, ". Setting status to ").concat(status, "."));
                        resolve(status); // Возвращаем 1 при успехе (exit code 0), иначе 0
                    });
                })];
        });
    });
}
// --- HTTP Metrics Server ---
var server = http.createServer(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, ex_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!(req.url === '/metrics')) return [3 /*break*/, 5];
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                res.setHeader('Content-Type', register.contentType); // register.contentType - это свойство объекта register (экземпляра prom-client.Registry). Библиотека prom-client сама определяет правильный Content-Type для представления метрик Prometheus (обычно это text/plain; version=0.0.4; charset=utf-8). Эта строка устанавливает правильный заголовок, чтобы Prometheus мог корректно интерпретировать полученные метрики.
                _b = (_a = res).end;
                return [4 /*yield*/, register.metrics()];
            case 2:
                _b.apply(_a, [_c.sent()]); // res.end() - это метод объекта res, который завершает отправку HTTP-ответа. Он может принимать один аргумент, который будет отправлен в теле ответа.
                return [3 /*break*/, 4];
            case 3:
                ex_1 = _c.sent();
                console.error("Error serving metrics:", ex_1);
                res.statusCode = 500;
                if (ex_1 instanceof Error) {
                    res.end("Internal Server Error: ".concat(ex_1.message));
                }
                else {
                    res.end("Internal Server Error: ".concat(String(ex_1)));
                }
                return [3 /*break*/, 4];
            case 4: return [3 /*break*/, 6];
            case 5:
                res.statusCode = 404;
                res.end('Not Found. Try /metrics');
                _c.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); });
var PORT = process.env.EXPORTER_PORT || 9100; // Порт для экспортера
var RUN_INTERVAL_MINUTES = 1; // Интервал запуска тестов
// --- Main Execution Logic ---
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var initialStatus;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Starting initial Playwright test run...');
                    return [4 /*yield*/, runPlaywrightTests()];
                case 1:
                    initialStatus = _a.sent();
                    testStatusGauge.set(initialStatus); // Устанавливает значение метрики testStatusGauge на основе результата первого запуска тестов.
                    console.log("Initial test run status set to: ".concat(initialStatus));
                    // Запускаем HTTP сервер для метрик
                    server.listen(PORT, function () {
                        console.log("Prometheus metrics exporter listening on port ".concat(PORT));
                    });
                    // Устанавливаем интервал для периодического запуска тестов Playwright. Функция runPlaywrightTests будет вызываться каждые RUN_INTERVAL_MINUTES минут. Результат каждого запуска будет обновлять значение метрики testStatusGauge.
                    setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                        var status;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, runPlaywrightTests()];
                                case 1:
                                    status = _a.sent();
                                    testStatusGauge.set(status);
                                    return [2 /*return*/];
                            }
                        });
                    }); }, RUN_INTERVAL_MINUTES * 60 * 1000); // Переводим минуты в миллисекунды
                    // Обработка сигналов для корректного завершения. Обработчик сигнала SIGTERM (сигнал завершения, обычно отправляемый при остановке контейнера). При получении этого сигнала сервер корректно завершает работу.
                    process.on('SIGTERM', function () {
                        console.log('SIGTERM signal received. Shutting down gracefully.');
                        server.close(function () {
                            console.log('HTTP server closed.');
                            process.exit(0);
                        });
                    });
                    process.on('SIGINT', function () {
                        console.log('SIGINT signal received. Shutting down gracefully.');
                        server.close(function () {
                            console.log('HTTP server closed.');
                            process.exit(0);
                        });
                    });
                    return [2 /*return*/];
            }
        });
    });
}
// Вызывает функцию main и обрабатывает любые неперехваченные ошибки, которые могут возникнуть в процессе выполнения.
main().catch(function (error) {
    console.error("Unhandled error in main execution:", error);
    process.exit(1);
});
