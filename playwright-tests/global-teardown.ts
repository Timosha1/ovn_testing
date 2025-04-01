import type {
  FullResult, Reporter, TestCase, TestResult
} from '@playwright/test/reporter';
import axios from 'axios';

interface TestStats {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
}

class MyReporter implements Reporter {
  private stats: TestStats = {
    total: 0,
    passed: 0,
    failed: 0,
    skipped: 0,
  };

  onTestEnd(test: TestCase, result: TestResult) {
    console.log(`Test "${test.title}" finished with status: ${result.status}`);
    this.stats.total++;
    if (result.status === 'passed') {
      this.stats.passed++;
    } else if (result.status === 'failed') {
      this.stats.failed++;
    } else if (result.status === 'skipped') {
      this.stats.skipped++;
    }
  }

  async onEnd(result: FullResult) {
    const exporterUrl = process.env.EXPORTER_URL || 'http://localhost:9100';

    console.log('Full test run result:', result);
    try {
      await axios.post(`${exporterUrl}/report`, this.stats);;
      console.log('Playwright test results sent to Prometheus exporter');
    } catch (error) {
      console.error('Error sending test results to exporter:', error);
    }
  }
}

export default MyReporter;