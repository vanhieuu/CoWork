import { Platform, StatusBar } from "react-native";
import theme from "./theme";
import * as ImagePicker from "expo-image-picker";
export const StatusBarHeight = StatusBar.currentHeight;
export const HeaderHeight = theme.SIZES.BASE * 3.5 + (StatusBarHeight || 0);
export const iphoneX = ({ height, width }: { height: number; width: number }) =>
  Platform.OS === "ios" && (height === 812 || width === 812);

export enum Role {
  admin = 1,
  user = 2,
}
export const testId = {
  menu: {
    CONTAINER: "menu",
    CALENDARS: "calendars_btn",
    CALENDAR_LIST: "calendar_list_btn",
    HORIZONTAL_LIST: "horizontal_list_btn",
    AGENDA: "agenda_btn",
    EXPANDABLE_CALENDAR: "expandable_calendar_btn",
    WEEK_CALENDAR: "week_calendar_btn",
    TIMELINE_CALENDAR: "timeline_calendar_btn",
  },
  calendars: {
    CONTAINER: "calendars",
    FIRST: "first_calendar",
    LAST: "last_calendar",
  },
  calendarList: { CONTAINER: "calendarList" },
  horizontalList: { CONTAINER: "horizontalList" },
  agenda: {
    CONTAINER: "agenda",
    ITEM: "item",
  },
  expandableCalendar: { CONTAINER: "expandableCalendar" },
  weekCalendar: { CONTAINER: "weekCalendar" },
};

export type ResultTelegramResponse = {
  message: {
    chat: {
      first_name: string;
      id: number;
      last_name: string;
      type: "private" | "public";
    };
    date: number;
    from: {
      first_name: string;
      id: number;
      last_name: string;
      language_code: string;
      is_bot: boolean;
      username: string;
    };
    message_id: number;
    text: string;
  };
  update_id: number;
};

export type TelegramBotResponse = {
  ok: boolean;
  result: ResultTelegramResponse[] ;
};
export interface TaskProps {
  id: number;
  task: string;
  isComplete: boolean;
  date: string;
  hour: string;
  endTime: string;
  output: string  | Blob;
}

export interface ImagePickerProps  {
  
 
  uri: string;
 
  id: number | undefined;
}
export type DataResponseBotUpdate = {
  message: {
    chat: {
      id: number;
      title: string;
      type: string;
    };
    date: number;
    from: {
      first_name: string;
      id: number;
      last_name: string;
      language_code: string;
      is_bot: boolean;
      username: string;
    };
    message_id: number;
    new_chat_member: {
      first_name: string;
      id: number;
      last_name: string;
      language_code: string;
      is_bot: boolean;
      username: string;
    };
    new_chat_members: {
      first_name: string;
      id: number;
      is_bot: boolean;
      username: string;
    }[];
    new_chat_participant: {
      first_name: string;
      id: number;
      last_name: string;
      language_code: string;
      is_bot: boolean;
      username: string;
    };
  };
  update_id: number;
};
