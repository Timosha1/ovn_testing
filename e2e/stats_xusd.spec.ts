// Этот тест надо переделать, большую часть проверок надо выполнить в тестах апи для скорости




import { test, expect } from '@playwright/test';
import { expectValidNumberValue } from './test_functions/expectValidNumberValue';

const statsXusdUrl = "https://app.overnight.fi/market/xusd";

test.beforeEach(async ({ page }) => {
    await page.goto(statsXusdUrl);
    await page.locator('.close-button').click()
});

// В этом тесте элемент xusdName загружается по 15 секунд, что делает тест супер долгим. Надо что-то думать
test('xusd stats has title', async ({ page }) => {
    const xusdName = page.locator('p.performance__token-data-title.performance__token-data-title--token');

    await expect(xusdName).toBeVisible({ timeout: 15000 });
    await expect(xusdName).toHaveText('xUSD');
});

// оптимизировать
test('xusd payouts timer', async ({ page }) => {
    const timerXusdPayout = page.locator('p.performance__token-data-num.performance__token-data-num--payout-ago');
    const timerXusdPayoutText = await timerXusdPayout.textContent();

    //await page.goto(statsXusdUrl);
    await expect(timerXusdPayout).toBeVisible({ timeout: 15000 });
    expect(timerXusdPayoutText).toBeDefined();
    expect(timerXusdPayoutText).not.toBeNull();

//  Разбираем текст на часы и минуты
    const timeParts = timerXusdPayoutText!.split(':'); // ! -  утверждение, что timeText не null после проверки выше
    const hoursString = timeParts[0]?.trim(); // Получаем часы и убираем пробелы, если есть.
    expect(hoursString).toBeDefined();

// Преобразуем часы в число, проверяем, что преобразование в число было успешным и является числом меньше 30.
    const hours = parseInt(hoursString!, 10); // 10 - основание системы счисления (десятичное).
    expect(isNaN(hours)).toBe(false);
    expect(typeof hours).toBe('number');
    expect(hours).toBeLessThanOrEqual(30);
    console.log(`Пейаут таймер в норме: ${hours}`)
});

test('xusd apy', async ({ page }) => {
    const apyElement = page.locator('p.performance__token-data-num.performance__token-data-num--apy-num');
    const apyText = await apyElement.textContent();

    const apyValue = await expectValidNumberValue(apyText);
    expect(apyValue).toBeGreaterThan(0.1);
    console.log(`Значение apyValue в норме: ${apyValue}`);
});

test('xusd tvl', async ({ page }) => {
    const tvlElement = page.locator('div.perfomance__TVL p.performance__token-data-num');
    const tvlText = await tvlElement.textContent();

    const tvlValue = await expectValidNumberValue(tvlText);
    expect(tvlValue).toBeGreaterThan(100000);
    console.log(`Значение XUSD TVL в норме: ${tvlValue}`);
});

test('av xusd apy', async ({ page }) => {
    const avApyElement = page.locator('div.performance__graphics-APY-graphic div.performance__graphic-values p:first-child');
    const avApyText = await avApyElement.textContent();

    const avApyValue = await expectValidNumberValue(avApyText);
    expect(avApyValue).toBeGreaterThan(0.1);
    console.log(`Значение avApyValue в норме: ${avApyValue}`);
});

test('avg tvl xusd', async ({ page }) => {
    const avgTvlElement = page.locator('div.performance__graphics-TVL-graphic div.performance__graphic-values p:first-child');
    const avgTvlText = await avgTvlElement.textContent();

    const avgTvlXusd = await expectValidNumberValue(avgTvlText);
    expect(avgTvlXusd).toBeGreaterThan(100000);
    console.log(`Значение avgTvlXusd в норме: ${avgTvlXusd}`);
})





