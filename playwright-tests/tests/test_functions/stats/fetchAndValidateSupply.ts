import { APIRequestContext } from '@playwright/test';


//  Эта функция запрашивает данные по API, проверяет успешность запроса, пытается прочитать ответ как JSON, убеждается, что полученное значение является числом, и возвращает это число. В случае проблем на любом этапе, она сообщает об ошибке.
export async function fetchAndValidateSupply(request: APIRequestContext, apiUrl: string) {
  const response = await request.get(apiUrl);
  if (response.status() !== 200) {
    throw new Error(`API returned status ${response.status()}`);
  }

  let supply;
  try {
    supply = await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to parse JSON: ${error.message}`);
    } else {
      throw new Error(`Failed to parse JSON: Unknown error`);
    }
  }

  if (isNaN(supply)) {
    throw new Error('NaN');
  }

  return supply;
}