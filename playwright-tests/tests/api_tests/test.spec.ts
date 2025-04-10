import { expect, test } from "playwright/test";
import * as allure from "allure-js-commons";

const sum = (a: number, b: number) => {
  return a + b;
};

const testCases: { x: number; y: number; expectedSum: number }[] = [
  { x: 1, y: 2, expectedSum: 3 },
  { x: 1, y: -1, expectedSum: 0 },
  { x: 0, y: 0, expectedSum: 0 },
];

testCases.forEach(({ x, y, expectedSum }) => {
  test(`the sum of ${x} and ${y} should be ${expectedSum}`, async () => {
    await allure.parameter("x", x.toString());
    await allure.parameter("y", y.toString());
    await allure.parameter("expectedSum", expectedSum.toString());

    expect(sum(x, y)).toBe(expectedSum);
  });
});