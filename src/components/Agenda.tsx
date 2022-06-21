import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import {
  Agenda,
  DateData,
  AgendaEntry,
  AgendaSchedule,
} from "react-native-calendars";
import { testId, theme } from "../constants";

const AgendaScreen = () => {
  const [item, setItem] = React.useState<AgendaSchedule>({});
  const [task, setTask] = React.useState({
    taskName: "fix bugđâsdasd",
    date: new Date().toISOString().split("T")[0],
  });
  const [modalVisible, setModalVisible] = React.useState(false);
  const timeToString = (time: number) => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  };

  const isWeekend = (date = new Date()) => {
    return date.getDay() === 6 || date.getDay() === 0;
  };

  const loadItems = React.useCallback((day: DateData) => {
    const items = item || {};

    // const time = day.timestamp + i * 24 * 60 * 60 * 1000
    setTimeout(() => {
      for (let i = -7; i < 7; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (!items[strTime]) {
          items[strTime] = [];
          if (strTime === task.date) {
            items[strTime].push({
              name: `+ ${task.taskName}`,
              height: 40,
              day: task.date,
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
  }, []);

  const renderItem = (reservation: AgendaEntry) => {
    return (
      <TouchableOpacity
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
        onPress={() => setModalVisible(true)}
        disabled={isWeekend(new Date(reservation.day)) === false ? false : true}
      >
        <View style={[styles.labelContainer]}>
          <Text style={styles.textLabel}>{reservation.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text style={styles.textLabel}>Chưa có task </Text>
      </View>
    );
  };

  const rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
    return r1.name !== r2.name;
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            backgroundColor: "red",
           
            // flex: 1,
            marginTop: 100,
            width: "90%",
            height: "70%",
            alignSelf: "center",
            top:10
          }}
        >
          <View>
            <View style={{
                justifyContent:'center',
                alignItems:'center',
                marginTop:20
            }}>
            <Text>Thêm task cho ngày {task.date}</Text>
            </View>
           
          </View>
        </View>
      </Modal>
      <Agenda
        testID={testId.agenda.CONTAINER}
        items={item}
        loadItemsForMonth={loadItems}
        selected={new Date().toISOString()}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        showClosingKnob={true}
        markingType="dot"
        markedDates={{
          "2022-06-21": { textColor: "red" },
        }}
        monthFormat={"mm"}
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
    paddingTop: 30,
  },
  textLabel: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    padding: 8,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
});
