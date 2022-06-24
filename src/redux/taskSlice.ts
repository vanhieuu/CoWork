import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AgendaEntry, AgendaSchedule } from "react-native-calendars";

export interface TaskAuth {
  day: AgendaEntry[];
}

const initState: AgendaSchedule = {
  day: [
    {
      name: "",
      day: "",
      height: 0,
    },
  ],
};

export const taskSlice = createSlice({
  name: "task",
  initialState: initState,
  reducers: {
    onAddTask: (state, action: PayloadAction<TaskAuth>) => {
      state.day = action.payload.day;
     
    },
  },
});
export const {onAddTask} = taskSlice.actions
export default taskSlice.reducer