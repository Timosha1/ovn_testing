import { APIRequestContext } from '@playwright/test';

// Эта функция отправляет запрос к API, убеждается, что запрос успешен, пытается прочитать и понять ответ как JSON, проверяет, что ответ является массивом, и возвращает этот массив. Если на каком-либо этапе происходит ошибка, функция сообщает об этом, выбрасывая исключение.
export async function fetchAndValidateResponse(request: APIRequestContext, apiUrl: string) {
  const response = await request.get(apiUrl);
  if (response.status() !== 200) {
    throw new Error(`API returned status ${response.status()}`);
  }

  let parsedResponse;
  try {
    parsedResponse = await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to parse JSON: ${error.message}`);
    } else {
      throw new Error(`Failed to parse JSON: Unknown error`);
    }
  }

  if (!Array.isArray(parsedResponse)) {
    throw new Error('Collateral is not an array');
  }

  return parsedResponse;
}