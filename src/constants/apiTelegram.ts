
export const TELEGRAM_BOT_TOKEN = "5473261873:AAGLTZih7MrgSXEO4OT6ACFy-fthuy8Etgs"
export const  TELEGRAM_USER_ID = '019637578'

export const makePostRequest = (url:string,details:{}) =>{
                    return fetch(url,{
                        method:'POST',
                        headers:{
                            'Content-Type':"application/json"
                        },
                        body:JSON.stringify(details)
                    })
                    .then((res) => res.json())
}