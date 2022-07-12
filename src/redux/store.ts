import { configureStore } from "@reduxjs/toolkit";
import task from './taskSlice'
import tele from './telegramSlice'
import auth from './authSlice'
import chat from './chatSlice'
const store = configureStore({
    reducer:{
        task,
        tele,
        auth,
        chat
    }
})
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch