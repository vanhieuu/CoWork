import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/RootStack";
import { theme } from "../../constants";
import { CoIcon, CoInput } from "../../components";
import { StatusBar } from "expo-status-bar";
import dayjs from "dayjs";

interface TaskProps {
  id: number;
  task: string;
  isComplete: boolean;
  date: string;
  hour: string;
  endTime: string;
}

const TaskWork = () => {
  const route = useRoute<RouteProp<RootStackParamList, "TaskWork">>();
  const params = route.params;
  const [show, setShow] = React.useState<boolean>(false);
  const [tasks, setTasks] = React.useState<TaskProps[]>([]);
  const [textInput, setTextInput] = React.useState("Thêm task");
  const [showMore, setShowMore] = React.useState<boolean>(false);

  const addTask = () => {
    const newTask: TaskProps = {
      id: Math.floor(Math.random() * 100),
      task: textInput,
      isComplete: false,
      date: params.task.day,
      hour: dayjs(new Date()).format("HH:mm"),
      endTime: "",
    };
    setTasks([...tasks, newTask]);
  };

  const onPressCheck = (id: number) => {
    const newTasks = tasks.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isComplete: true,
          endTime: dayjs(new Date()).format("HH:mm"),
        };
      }
      return item;
    });
    setTasks(newTasks);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.textHeader}>{params.task.name}</Text>

        <Text style={styles.textHeader}>{params.task.day}</Text>
      </View>

      <View style={styles.containerTask}>
        <View style={styles.handleInput}>
          <Text>Thêm task </Text>
          <TouchableOpacity onPress={() => setShow(true)}>
            <CoIcon
              name="pluscircle"
              family="AntDesign"
              size={30}
              color={theme.COLORS.ACTIVE}
            />
          </TouchableOpacity>
        </View>
        {!!show && (
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={show}
              onRequestClose={() => {
                setShow(!show);
              }}
            >
              <View style={styles.centeredView}>
                <StatusBar hidden />
                <View style={styles.modalView}>
                  <StatusBar hidden />
                  <CoInput
                    shadowless={false}
                    success={false}
                    error={false}
                    placeHolder={""}
                    name={""}
                    onChangeText={(value: string) => setTextInput(value)}
                    value={textInput}
                    style={{}}
                    secureTextEntry={false}
                  />
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      addTask(), setShow(!show);
                    }}
                  >
                    <Text style={styles.textStyle}>Add Task</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>
        )}
        <View style={styles.containerCard}>
          {tasks.map((item, index) => {
            return (
              <View key={index} style={styles.cardTask}>
                <View>
                  <Text
                    style={[
                      styles.taskList,
                      {
                        textDecorationLine:
                          item.isComplete === true ? "line-through" : "none",
                        fontSize: item.isComplete === true ? 12 : 16,
                        color:
                          item.isComplete === true
                            ? theme.COLORS.ERROR
                            : theme.COLORS.SUCCESS,
                      },
                    ]}
                  >
                    + {item.task}
                  </Text>
                  {!!showMore && (
                    <View
                      style={{
                        marginHorizontal: 20,
                      }}
                    >
                      <Text style={{
                        fontSize:12,
                        color:theme.COLORS.GRADIENT_START
                      }}>
                        {item.hour} - {item.endTime}{" "}
                      </Text>
                    </View>
                  )}
                </View>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={[
                      styles.iconCheck,
                      {
                        backgroundColor: theme.COLORS.SUCCESS,
                      },
                    ]}
                    onPress={() => {
                      onPressCheck(item.id);
                      setShowMore(true);
                    }}
                  >
                    <CoIcon
                      name="check"
                      family="Entypo"
                      size={20}
                      color={theme.COLORS.BLACK}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default TaskWork;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
  },
  textHeader: {
    fontSize: 20,
    fontWeight: "bold",
  },
  containerHeader: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "80%",
    marginHorizontal: 40,
    // backgroundColor: "blue",
    // flex:1
  },
  containerTextAdd: {
    fontSize: 16,
    fontWeight: "bold",
  },
  containerTask: {
    marginTop: 20,
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  handleInput: {
    flexDirection: "row",
    alignItems: "center",
    // width: "100%",
    // flex:1,
    // backgroundColor: "red",
  },
  taskList: {
    fontWeight: "bold",
    marginLeft: 10,
  },
  cardTask: {
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: theme.COLORS.WHITE,
    marginHorizontal: 10,
    height: 60,
    justifyContent: "space-between",
    shadowColor: theme.COLORS.DEFAULT,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  containerCard: {
    width: "90%",
    // flex:1,
    // flexWrap:'wrap'
  },
  iconCheck: {
    borderRadius: 10,
    // backgroundColor: theme.COLORS.SUCCESS,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginRight: 10,
    width: 40,
    height: 40,
  },
  centeredView: {
    flex: 1,
    marginTop: 20,
    width: "100%",
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: "75%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
