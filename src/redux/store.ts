import { configureStore } from "@reduxjs/toolkit";
import task from './taskSlice'
import tele from './telegramSlice'
const store = configureStore({
    reducer:{
        task,
        tele
    }
})
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch