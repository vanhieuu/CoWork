import {
  makePostRequest,
  TELEGRAM_BOT_TOKEN,
  TELEGRAM_USER_ID,
} from "./apiTelegram";
const telegramBotKey = TELEGRAM_BOT_TOKEN;
const chat_id = TELEGRAM_USER_ID;

export const sendNotification = async (text: string, parse_mode: any) => {
  const endPoint = `https://api.telegram.org/bot${telegramBotKey}/sendMessage`;
  await makePostRequest(endPoint, {
    text,
    parse_mode,
    chat_id,
  });
};
