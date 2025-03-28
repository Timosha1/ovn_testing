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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prom_client_1 = require("prom-client");
const app = (0, express_1.default)();
const port = 9100; // Стандартный порт для пользовательских экспортеров
const testsTotal = new prom_client_1.Gauge({
    name: 'playwright_tests_total',
    help: 'Total number of Playwright tests',
});
const testsPassed = new prom_client_1.Gauge({
    name: 'playwright_tests_passed',
    help: 'Number of Playwright tests passed',
});
const testsFailed = new prom_client_1.Gauge({
    name: 'playwright_tests_failed',
    help: 'Number of Playwright tests failed',
});
const testsSkipped = new prom_client_1.Gauge({
    name: 'playwright_tests_skipped',
    help: 'Number of Playwright tests skipped',
});
app.use(express_1.default.json());
app.post('/report', (req, res) => {
    const { total, passed, failed, skipped } = req.body;
    if (total !== undefined && passed !== undefined && failed !== undefined && skipped !== undefined) {
        testsTotal.set(total);
        testsPassed.set(passed);
        testsFailed.set(failed);
        testsSkipped.set(skipped);
        res.sendStatus(200);
    }
    else {
        res.status(400).send('Invalid test results data');
    }
});
app.get('/metrics', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.set('Content-Type', prom_client_1.register.contentType);
        res.end(yield prom_client_1.register.metrics());
    }
    catch (error) {
        console.error('Error serving metrics:', error);
        res.status(500).send('Error serving metrics');
    }
}));
app.listen(port, () => {
    console.log(`Playwright Prometheus exporter listening on port ${port}`);
});
