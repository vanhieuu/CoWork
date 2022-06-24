import dayjs from "dayjs";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Alert,
  TextInput,
} from "react-native";
import {
  Agenda,
  DateData,
  AgendaEntry,
  AgendaSchedule,
} from "react-native-calendars";

import { testId, theme } from "../constants";

import CoInput from "./Input";

const AgendaScreen = () => {
  const [task, setTask] = React.useState("task1");

  const [item, setItem] = React.useState<{ [key: string]: AgendaEntry[] }>({
    day: [
      {
        name: `${task}`,
        day: dayjs(new Date()).format("DD/MM/YYYY"),
        height: 40,
      },
      {
        name: `task2}`,
        day: dayjs(new Date()).format("DD/MM/YYYY"),
        height: 40,
      },
    ],
    day2: [
      {
        name: `${task}`,
        day: dayjs(new Date()).format("DD/MM/YYYY"),
        height: 40,
      },
      {
        name: `task2}`,
        day: dayjs(new Date()).format("DD/MM/YYYY"),
        height: 40,
      },
    ],
  });



  const timeToString = (time: number) => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  };

  const isWeekend = (date = new Date()) => {
    return date.getDay() === 6 || date.getDay() === 0;
  };

  const loadItems = (day: DateData) => {
    const items = item || {};

    setTimeout(() => {
      for (let i = -2; i < 2; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        
        if (!items[strTime]) {
          items[strTime] = [];
          if (strTime === dayjs(new Date()).format("YYYY-MM-DD")) {
            items[strTime].push({
              name: `+ ${task}`,
              height: 40,
              day: dayjs(strTime).format("DD/MM/YYYY"),
            });
          }
          if (isWeekend(new Date(strTime)) === true) {
            items[strTime].push({
              name: "Ngày nghỉ ",
              height: 40,
              day: strTime,
            });
          }
        }
      }
      const newItems: AgendaSchedule = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItem(newItems);
    }, 1000);
  };

  const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    return (
      <TouchableOpacity
        testID={testId.agenda.ITEM}
        style={{
          marginTop: 17,
          marginRight: 10,
          backgroundColor:
            isWeekend(new Date(reservation.day)) === false
              ? theme.COLORS.SUCCESS
              : theme.COLORS.BLOCK,
          flex: 1,
          borderRadius: 10,
        }}
        onPress={() => {
          Alert.alert("dcm");
        }}
      >
        <View style={styles.labelContainer}>
          <Text style={styles.textLabel}>{reservation.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = React.useCallback((data: Date) => {
    return (
      <TouchableOpacity
        style={styles.emptyDate}
        onPress={() => console.log(data.toISOString().split("T")[0])}
      >
        <View>
          <Text style={styles.textLabel}>
            {" "}
            Chưa có task{" "}
            {dayjs(data.toISOString().split("T")[0]).format("DD/MM/YYYY")}{" "}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }, []);

  const rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
    return r1.name !== r2.name;
  };

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={item}
        selected={new Date().toISOString()}
        renderItem={renderItem}
        loadItemsForMonth={loadItems}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        monthFormat={"MMM"}
      />
    </View>
  );
};
export default AgendaScreen;

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    backgroundColor: theme.COLORS.INPUT_ERROR,
    // margin:20,
    borderRadius: 10,
    // padding:10,
    marginVertical: 10,
  },
  textLabel: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    padding: 8,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  modalView: {
    backgroundColor: theme.COLORS.WARNING,
    marginTop: 100,
    width: "90%",
    height: "70%",
    alignSelf: "center",
    top: 10,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonStyle: {
    backgroundColor: theme.COLORS.ACTIVE,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginHorizontal: 50,
    borderRadius: 20,
    marginTop: 20,
  },
  textButton: {
    color: "#fff",
    fontSize: theme.SIZES.BASE,
  },
});
