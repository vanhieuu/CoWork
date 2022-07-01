import { ResultTelegramResponse } from "./../constants/ultil";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TelegramBotResponse } from "../constants/ultil";

const initialState: TelegramBotResponse = {
  ok: false,
  result: [
    {
      message: {
        chat: {
          first_name: "Văn",
          id: 1019637578,
          last_name: "Hiếu",
          type: "private",
        },
        date: 1656492148,
        from: {
          first_name: "Văn",
          id: 1019637578,
          is_bot: false,
          language_code: "en",
          last_name: "Hiếu",
          username:'Văn Hiếu'
        },
        message_id: 7,
        text: "hello from the another side",
      },
      update_id: 81443990,
    },
  ],
};

export const teleSlice = createSlice({
    name:'telegram',
    initialState:initialState,
    reducers:{
        onGetInfo:(state,action:PayloadAction<TelegramBotResponse>) =>{
            state.ok = action.payload.ok
            state.result = action.payload.result
        }
    }
})

export const {onGetInfo} = teleSlice.actions
export default teleSlice.reducer