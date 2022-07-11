import theme from "./theme";
import { Role, testId } from "./ultil";
import {
  makePostRequest,
  TELEGRAM_BOT_TOKEN,
  TELEGRAM_USER_ID,
  getUserInfo
} from "./apiTelegram";
import { sendNotification } from "./telegram";
import handler from "./share";
import { app,storage ,firebaseAuth} from "./firebase";

export {
  theme,
  Role,
  testId,
  makePostRequest,
  TELEGRAM_BOT_TOKEN,
  TELEGRAM_USER_ID,
  sendNotification,
  handler,
  getUserInfo,
  app,
  firebaseAuth,
 
  
  storage
};
