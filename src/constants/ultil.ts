import { Platform, StatusBar } from "react-native";
import theme from "./theme";
import PropTypes from 'prop-types'

import { QuickReplies, User } from "react-native-gifted-chat";
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
    new_chat_members: NewChatMemberProps[];
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

export type TelegramBotResponse = {
  ok: boolean;
  result: ResultTelegramResponse[];
};
export interface TaskProps {
  id: number;
  task: string;
  isComplete: boolean;
  date: string;
  hour: string;
  endTime: string;
  output: string | Blob;
}

export interface ImagePickerProps {
  uri: string;
  id: number | undefined;
}

export interface NewChatMemberProps {
  first_name: string;
  id: number;
  is_bot: boolean;
  username: string;
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
    new_chat_members: NewChatMemberProps[];
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
export interface IMessage {
  _id: string | number
  text: string
  createdAt: Date | number
  user: User
  image?: string
  video?: string
  audio?: string
  system?: boolean
  sent?: boolean
  received?: boolean
  pending?: boolean
  quickReplies?: QuickReplies
}

export const StylePropType = PropTypes.oneOfType([
  PropTypes.array,
  PropTypes.object,
  PropTypes.number,
  PropTypes.bool,
])