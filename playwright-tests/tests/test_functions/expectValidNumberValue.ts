// import { expect } from '@playwright/test';
//
// // Функция для проверки, что значение является валидным числом и не равно нежелательным значениям
// export async function expectValidNumberValue(valueText: string | null) {
//     expect(valueText).toBeDefined();
//     expect(valueText).not.toBeNull();
//
//     const invalidValues = ['0.00%', '0%', '0', '$0.00', '$0', '0.00', '0'];
//     expect(invalidValues).not.toContain(valueText?.trim());
//
//     //console.log(`Значение до преобразования: ${valueText}`)
//     const stringValue = valueText!.replace('%', '').replace('$', '').replace(/,/g, ''); // флаг g = global убирает для всех вхождений  паттерна
//     const numberValue = parseFloat(stringValue);
//     //console.log(`Значение после преобразования: ${numberValue}`)
//
//     expect(isNaN(numberValue)).toBe(false);
//     expect(typeof numberValue).toBe('number');
//     expect(numberValue).toBeGreaterThanOrEqual(0);
//     return numberValue;
// }