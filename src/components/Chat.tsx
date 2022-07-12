import { TouchableOpacity, Platform, Image, Text, View, Button } from "react-native";
import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import {
  GiftedChat,
  IMessage,
  Send,
  SendProps,
  User,
} from "react-native-gifted-chat";
import {
  onSnapshot,
  collection,
  addDoc,
  orderBy,
  query,
} from "firebase/firestore";
import { firebaseAuth, dataBase, theme } from "../constants";
import { CoIcon, CustomActions } from ".";
import { signOut } from "firebase/auth";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/RootStack";
import { ActionPressProps } from "./CustomActions";
import { LocationObjectCoords } from "expo-location";
import dayjs from "dayjs";

const Chat = () => {
  const [message, setMessage] = useState<IMessage[]>([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [user, setUser] = useState<User>();
  const onSignOut = () => {
    signOut(firebaseAuth).catch((err) => console.error(err));
  };

  useEffect(() => {
    const collectionRef = collection(dataBase, "chats");
    const currentUser = firebaseAuth.currentUser;
    setUser({
      _id: currentUser?.providerId,
      name: currentUser!.displayName,
    });
    const q = query(collectionRef, orderBy("createdAt", "desc"));
    const unSubscribe = onSnapshot(q, (snapshot) => {
      setMessage(
        snapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          //   image: doc.data().images,
          user: doc.data().user,
        }))
      );
      return () => unSubscribe();
    });
  }, []);

  const onSend = useCallback((messages: IMessage[]) => {
    setMessage((prevMess: any) => GiftedChat.append(prevMess, message));

    const { _id, createdAt, text, user, image } = messages[0];
    addDoc(collection(dataBase, "chats"), {
      _id,
      createdAt,
      text,
      user,
      //   image,
    });
  }, []);

  const renderSend = (props: IMessage) => (
    <Send containerStyle={{ justifyContent: "center" }}>
      <CoIcon
        size={30}
        color={"tomato"}
        name={"send"}
        family={"MaterialIcons"}
      />
      <Text>{props.text}</Text>
      <Image source={{ uri: props.image }} />
    </Send>
  );

  const onSendFromUser = (messages: IMessage[]) => {
    const createdAt = dayjs(new Date()).format("DD-MM-YYYY");
    const messagesToUpload = messages.map((message) => ({
      ...message,
      user,
      createdAt,
      _id: Math.round(Math.random() * 1000000),
    }));
    setMessage((prev) => ({
      ...prev,
      messagesToUpload,
    }));
  };

  const renderCustomActions = ({
    onSend,
    wrapperStyle,
    iconTextStyle,
    containerStyle,
    ...props
  }: ActionPressProps) =>
    Platform.OS === "web" ? null : <CustomActions {...props} onSend={onSend} />;

  return (
    <GiftedChat
      messages={message}
    //   onSend={onSend}
      user={{
        _id: firebaseAuth!.currentUser!.email,
        avatar: "",
      }}
      messagesContainerStyle={{
        backgroundColor: "#fff",
      }}
      renderActions={renderCustomActions}
      renderSend={(item:IMessage) => {
        {
          console.log(item.text,'item');
          console.log(item.image,'itemImage');
        }
        return (
          <View style={{flex:1,justifyContent:'center'}}>
            <Image source={{ uri: item.image }} style={{
                width:100,
                height:100,
                backgroundColor:'red',
                resizeMode:'center'
            }} />
           
          </View>
        );
      }}
    />
  );
};

export default Chat;
