import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AgendaEntry, AgendaSchedule } from "react-native-calendars";


export interface DateProps {
     name:string,
      height:number,
      hour:string,
      day:string
}

export interface TaskAuth {
    [date:string]:DateProps[]
}

export interface InitState  {
  days:TaskAuth
}

const initState: InitState = {
  days:{  
    "date":[
      {
        name:'',
        hour:'',
        height:0,
        day:''
      }
    ]
  }
};

export const taskSlice = createSlice({
  name: "task",
  initialState: initState,
  reducers: {
    onAddTask: (state, action: PayloadAction<InitState>) => {
      state.days = action.payload.days;
     
    },
  },
});
export const {onAddTask} = taskSlice.actions
export default taskSlice.reducer