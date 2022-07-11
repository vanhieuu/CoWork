import { configureStore } from "@reduxjs/toolkit";
import task from './taskSlice'
import tele from './telegramSlice'
import auth from './authSlice'
const store = configureStore({
    reducer:{
        task,
        tele,
        auth
    }
})
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch