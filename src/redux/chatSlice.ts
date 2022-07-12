import { IMessage } from 'react-native-gifted-chat';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
` "_id": "uiQXfJQUQ5RZzNCOgbIB",
"createdAt": 2022-07-12T08:35:04.126Z,
"image": undefined,
"text": "hẻ",
"user": Object {
  "_id": "vanhieuu99@gmail.com",
  "avatar": "",`






const initState:IMessage = {
    _id: "",
    createdAt: 0,
    image: "",
    text: "hẻ",
    user:  {
      _id: "vanhieuu99@gmail.com",
      avatar: "",
}
}

const chatSlice = createSlice({
    initialState:initState,
    name:'chat',
    reducers: {
        onGetImage: (state, action) => {
            state.image = action.payload.image
        },
        onGetChat:(state,action:PayloadAction<IMessage>)=>{
                state._id = action.payload._id,
                state.createdAt = action.payload.createdAt,
                state.text = action.payload.text,
                state.user = action.payload.user
                state.image = action.payload.image
        }
      },
    });

    export const { onGetImage,onGetChat } = chatSlice.actions;
    export default chatSlice.reducer;