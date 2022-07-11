import {
  ActivityIndicator,
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
import { app, theme } from "../../constants";
import { CoIcon, CoInput } from "../../components";
import { StatusBar } from "expo-status-bar";
import dayjs from "dayjs";
import {
  getUserInfo,
  TELEGRAM_USER_ID,
  URL,
} from "../../constants/apiTelegram";
import * as ImagePicker from "expo-image-picker";
import {
  ImagePickerProps,
  TaskProps,
  TelegramBotResponse,
} from "../../constants/ultil";
import { getDatabase, onValue } from "firebase/database";
import * as firebase from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  updateMetadata,
  uploadBytes,
} from "firebase/storage";
import "firebase/storage";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { TaskAuth } from "../../redux/taskSlice";
const userId = 5231804117;

const TaskWork = () => {
  const route = useRoute<RouteProp<RootStackParamList, "TaskWork">>();
  const params = route.params;
  const stateRedux = useSelector<RootState, TaskAuth>(
    (state) => state.task.days
  );
  const [show, setShow] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [tasks, setTasks] = React.useState<TaskProps[]>([]);
  const [textInput, setTextInput] = React.useState("Thêm task");
  const [showMore, setShowMore] = React.useState<boolean>(true);
  const [resImage, setResImage] = React.useState("");
  const [dataResponse, setDataRes] = React.useState<TelegramBotResponse>();

  const [image, setImage] = React.useState<ImagePickerProps[]>([]);
  React.useEffect(() => {
    const getData = async () => {
      await getUserInfo().then((data: TelegramBotResponse) => {
        setDataRes(data);
      });
    };
    getData();

    return () => {};
  }, []);

  const openImagePickerAsync = async (id: number) => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });

    if (!pickerResult.cancelled) {
      console.log(pickerResult.cancelled, "pickerResult cancelled");
    }
    if (pickerResult.cancelled === false) {
      const blob: Blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", pickerResult.uri, true);
        xhr.send(null);
        
      });
      
      const metadata = { contentType: "image/jpg" };
      const firebaseStore = getStorage(app, "cowork-7a15a.appspot.com");
      const reference = ref(
        firebaseStore,
        pickerResult.uri.substring(pickerResult.uri.lastIndexOf("/") + 1)
      );

      await uploadBytes(reference, blob, metadata).then(
        (res) => {
          setLoading(true);
          getDownloadURL(res.ref)
            .then((url) => {
              pickerResult.uri = url;
              setResImage(url);
            })
            .then(() => {
              setLoading(true);
              const newImage: ImagePickerProps = {
                uri: pickerResult.uri,
                id: tasks.find((item) => item.id === id)?.id,
              };

              setImage([...image, newImage]);
              const newTasks = tasks.map((item) => {
                if (item.id === id) {
                  return {
                    ...item,
                    isComplete: true,
                    endTime: dayjs(new Date()).format("HH:mm"),
                    output: pickerResult.uri,
                  };
                }
                return item;
              });
              setTasks(newTasks);
              console.log(newTasks, "pickerResult");

              setLoading(false);
            });
        },
        (err) => {
          console.error(err);
        }
      );
    }
  };

  const sendPhoto = async (id: number) => {
    if (loading === true) return null;
    setLoading(true);
    const objectTask = {
      Task: tasks.find((item) => item.id === id)!.task,
      "Thời gian bắt đầu": tasks.find((item) => item.id === id)?.hour,
      "Thời gian kết thúc": tasks.find((item) => item.id === id)?.endTime,
      Ngày: tasks.find((item) => item.id === id)?.date,
      "Người thực hiện": `[@${
        dataResponse?.result.find((item) => item.message.from.id === userId)
          ?.message.from.first_name
      } ${
        dataResponse?.result.find((item) => item.message.from.id === userId)
          ?.message.from.last_name
      }    ](tg://user?id=${
        dataResponse?.result.find((item) => item.message.from.id === userId)
          ?.message.from.id
      })`,
    };



    const taskDone = Object.entries(objectTask)
      .map((x) => x.join(": "))
      .join("\r\n");

    const formData = new FormData();

    formData.append("chat_id", TELEGRAM_USER_ID);
    formData.append("photo", image.find((item) => item.id === id)!.uri);
    formData.append("file_id", tasks.find((item) => item.id === id)!.task);
    formData.append("caption", taskDone);
    formData.append("parse_mode", "Markdown");

    await fetch(URL.sendPhoto(formData), {
      method: "POST",
      headers: {
        Accept: "multipart/form-data",
        "Content-type": "multipart/form-data",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((json: TelegramBotResponse) => {
        if (json.ok === false) {
          Alert.alert("Không thành công");
        } else {
          Alert.alert("Thành công");
        }

        setLoading(false);
      });
  };

  const addTask = () => {
    const newTask: TaskProps = {
      id: Math.floor(Math.random() * 100),
      task: textInput,
      isComplete: false,
      date: params.task.day,
      hour: dayjs(new Date().getTime()).format("HH:mm"),
      endTime: "",
      output: "",
    };
    setTasks([...tasks, newTask]);
    console.log(newTask, "new Task for add Task");

    setShow(!show);
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
                    onPress={addTask}
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
                      <Text
                        style={{
                          fontSize: 12,
                          color: theme.COLORS.GRADIENT_START,
                        }}
                      >
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
                      openImagePickerAsync(item.id);
                      setShowMore(true);
                      // testSendMessage(item.id);
                    }}
                  >
                    <CoIcon
                      name="check"
                      family="Entypo"
                      size={20}
                      color={theme.COLORS.BLACK}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.iconCheck,
                      {
                        backgroundColor: theme.COLORS.ACTIVE,
                      },
                    ]}
                    onPress={() => {
                      sendPhoto(item.id);
                      
                    }}
                    disabled={loading === true ? true : false}
                  >
                    {loading === true ? (
                      <ActivityIndicator
                        size={"large"}
                        color={theme.COLORS.SUCCESS}
                      />
                    ) : (
                      <CoIcon
                        name="publish"
                        family="Entypo"
                        size={20}
                        color={theme.COLORS.ICON}
                      />
                    )}
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
    // backgroundColor: "red",
    width: 100,
    // height: 50,
    justifyContent: "center",
    alignItems: "center",
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
