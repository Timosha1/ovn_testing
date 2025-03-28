import express from 'express';
import { register, Gauge } from 'prom-client';

const app = express();
const port = 9100;

const testsTotal = new Gauge({
  name: 'Tests_total',
  help: 'Total number of tests executed',
});

const testsPassed = new Gauge({
  name: 'Tests_passed',
  help: 'Number of tests that passed successfully',
});

const testsFailed = new Gauge({
  name: 'Tests_failed',
  help: 'Number of tests that failed',
});

const testsSkipped = new Gauge({
  name: 'Tests_skipped',
  help: 'Number of tests that were skipped',
});

const health = new Gauge({
  name: 'health',
  help: 'Health status of the application (1 for healthy, 0 for unhealthy)',
  labelNames: ['app'],
});

app.use(express.json());

app.post('/report', (req, res) => {
  const { total, passed, failed, skipped } = req.body;
  const appName = 'API_TESTS_PLAYWRIGHT'; 

  if (total !== undefined && passed !== undefined && failed !== undefined && skipped !== undefined) {
    testsTotal.set(total);
    testsPassed.set(passed);
    testsFailed.set(failed);
    testsSkipped.set(skipped);

    if (failed > 0) {
      health.set({ app: appName }, 0);
    } else {
      health.set({ app: appName }, 1);
    }

    res.sendStatus(200);
  } else {
    res.status(400).send('Invalid test results data');
  }
});

app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (error) {
    console.error('Error serving metrics:', error);
    res.status(500).send('Error serving metrics');
  }
});

app.listen(port, () => {
  console.log(`Playwright Prometheus exporter listening on port ${port}`);
});