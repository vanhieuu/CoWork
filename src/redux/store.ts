import { configureStore } from "@reduxjs/toolkit";
import task from './taskSlice'

const store = configureStore({
    reducer:{
        task
    }
})
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch