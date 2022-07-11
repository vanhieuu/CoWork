
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TelegramBotResponse } from "../constants/ultil";

const initialState: TelegramBotResponse = {
  ok: false,
  result: [
    {
      message: {
        chat: {
          id: 1019637578,
          type: "private",
          title: "None",
        },
        date: 1656492148,
        from: {
          first_name: "Văn",
          id: 1019637578,
          is_bot: false,
          language_code: "en",
          last_name: "Hiếu",
          username: "Văn Hiếu",
        },
        message_id: 7,
        new_chat_member: {
          first_name: "Văn",
          id: 0,
          last_name: "",
          language_code: "",
          is_bot: false,
          username: "",
        },
        new_chat_members: [
          {
            first_name: "",
            id: 0,
            is_bot: false,
            username: "",
          },
        ],
        new_chat_participant:{
          first_name:'',
          id:0,
          last_name:'',
          language_code:'',
          is_bot:false,
          username:''
        }
      },

      update_id: 81443990,
    },
  ],
};

export const teleSlice = createSlice({
  name: "telegram",
  initialState: initialState,
  reducers: {
    onGetInfo: (state, action: PayloadAction<TelegramBotResponse>) => {
      state.ok = action.payload.ok;
      state.result = action.payload.result;
    },
  },
});

export const { onGetInfo } = teleSlice.actions;
export default teleSlice.reducer;
