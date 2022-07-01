
export const TELEGRAM_BOT_TOKEN =
  "5480929106:AAFdqIhycHCH7v4RbgKmMpbiDSxIAg-MP44";
export const TELEGRAM_USER_ID = "-1001780907840";


const endPoints = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

export const URL = {
  sendMessage: (text: string | undefined) =>
    endPoints + `/sendMessage?chat_id=${TELEGRAM_USER_ID}&text=${text}`,
  sendPhoto: (formData: FormData) =>
    endPoints + `/sendPhoto?chat_id=${TELEGRAM_USER_ID}${formData}`,
  getBotUpdate: endPoints + `/getUpdates`,
};

export const getUserInfo = async () => {
  return fetch(URL.getBotUpdate, {
    method: "GET",
  })
    .then((response) => response.json())
    
    
};

export const makePostRequest = (url: string, details: {}) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(details),
  }).then((res) => res.json());
};
