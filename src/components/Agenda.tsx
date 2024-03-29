import { NavigationProp, useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import {
  Agenda,
  DateData,
  AgendaEntry,
  AgendaSchedule,
} from "react-native-calendars";
import { useDispatch, useSelector } from "react-redux";

import { theme } from "../constants";
import { RootStackParamList } from "../navigation/RootStack";
import { RootState } from "../redux/store";
import { DateProps,  onAddTask, TaskAuth, } from "../redux/taskSlice";

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
const timeToString = (time: number) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};

const isWeekend = (date = new Date()) => {
  return date.getDay() === 6 || date.getDay() === 0;
};

const AgendaScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const dayTask = useSelector<RootState, TaskAuth>((state) => state.task.days);

  const [items, setItem] = React.useState<AgendaSchedule>({
    "28/06/2022": [
      {
        day: "28/06/2022",
        height: 40,
        name: "Task1",
        hour: "10:00 AM - 10:45 AM",
      },
      {
        day: "28/05/2022",
        height: 40,
        name: "Task2",
        hour: "10:00 AM - 10:45 AM",
      },
    ],
  });

  React.useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://my-json-server.typicode.com/vanhieuu/fakeData/post"
      );
      const data: AgendaSchedule[] = await response.json();
      const mappedData = Object.assign({}, ...data);
      setItem(mappedData);
      dispatch(onAddTask({ days:mappedData }));
    };

    getData();
  }, []);
  //Get date as key object dayTask 
 
  
  
  const loadItems = (day: DateData) => {
    const item = items || dayTask || {};

    setTimeout(() => {
      for (let i = -3; i < 3; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (!item[strTime]) {
          item[strTime] = [];
          if (strTime === dayjs(new Date()).format("YYYY-MM-DD")) {
            item[strTime]?.push({
              name: `Task${i}`,
              day: dayjs(strTime).format("DD/MM/YYYY"),
              height: 60,
              hour: dayjs(strTime).format("HH:mm"),
            });
          }
          if (isWeekend(new Date(strTime)) === true) {
            item[strTime]?.push({
              name: "Ngày nghỉ",
              day: dayjs(strTime).format("DD/MM/YYYY"),
              height: 10,
              hour: "",
            });
          }
        }
      }
      const newItems: AgendaSchedule = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = item[key];
      });
    
      setItem(newItems);
    }, 1000);
  };

  const renderItem = (item: AgendaEntry) => {
    return (
      <TouchableOpacity
        style={{
          marginTop: 17,
          marginRight: 10,
          backgroundColor:
            isWeekend(new Date(dayjs(item.day).format("DD/MM/YYYY"))) === false
              ? theme.COLORS.COEDU
              : theme.COLORS.BLOCK,
          flex: 1,
          borderRadius: 10,
        }}
        onPress={() => {
          navigation.navigate("TaskWork", {
            task: item,
          });
        }}
        disabled={
          isWeekend(new Date(dayjs(item.day).format("DD/MM/YYYY"))) === true
            ? true
            : false
        }
      >
        <View style={styles.labelContainer}>
          <Text style={styles.textHour}>{item.hour}</Text>
          <Text style={styles.textLabel}>{item.name}</Text>
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
        items={items || dayTask}
        selected={new Date().toISOString()}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        loadItemsForMonth={loadItems}
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
  textHour: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    padding: 8,
    fontWeight: "bold",
  },
  labelContainer: {
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    flexWrap: "wrap",
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
