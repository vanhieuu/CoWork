import {
  makePostRequest,
  TELEGRAM_BOT_TOKEN,
  TELEGRAM_USER_ID,
} from "./apiTelegram";
const telegramBotKey = TELEGRAM_BOT_TOKEN;
const chat_id = TELEGRAM_USER_ID;
const endPoint = `https://api.telegram.org/bot${telegramBotKey}/sendMessage`
export const sendNotification = async (text: string, parse_mode: any) => {
  await makePostRequest(endPoint, {
    text,
    parse_mode,
    chat_id,
  });
};
