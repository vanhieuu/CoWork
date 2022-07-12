import {
  TouchableOpacity,
  Platform,
  Image,
  Text,
  View,
  Button,
  Linking,
} from "react-native";
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
import AccessoryBar from "./AccessoryBar";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Chat = () => {
  const [message, setMessage] = useState<IMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const renderSend = (props: SendProps<IMessage>) => (
    <Send {...props} containerStyle={{ justifyContent: "center" }}>
      <CoIcon
        size={30}
        color={theme.COLORS.ICON}
        name={"send"}
        family={"MaterialIcons"}
      />
    </Send>
  );
  useLayoutEffect(() => {
    const collectionRef = collection(dataBase, "chats");
    const q = query(collectionRef, orderBy("createdAt"));
    const unSubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.docs) return null;
      setMessage(
        snapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          image: doc.data().image,
          user: doc.data().user,
        }))
      );
      console.log(message, "mes snapshot");
    });
    return unSubscribe;
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

  // const renderCustomActions = () =>
  //   Platform.OS === "web" ? null : <CustomActions onSend={onSendFromUser} />;

  const onSendImage = (images: { image: string; }[]) =>{
      setMessage((prev) =>({
        ...prev,
        images
      }))
      
  }



  const renderAccessory = () => (
    <AccessoryBar onSend={onSendImage} isTyping={() => setIsTyping(!isTyping)} />
  );

  const onSendFromUser = (messages: IMessage[] = []) => {
    const createdAt = new Date();
    const messagesToUpload = messages.map((message) => ({
      ...message,
      createdAt,
      _id: Math.round(Math.random() * 1000000),
      
    }));
    onSend(messagesToUpload);
  };

  const parsePatterns = (_linkStyle: any) => {
    return [
      {
        pattern: /#(\w+)/,
        style: { textDecorationLine: "underline", color: "darkorange" },
        onPress: () => Linking.openURL("http://gifted.chat"),
      },
    ];
  };




  return (
    <GiftedChat
      messages={message}
      onSend={onSend}
      user={{
        _id: firebaseAuth!.currentUser!.email,
        avatar: "",
      }}
      messagesContainerStyle={{
        backgroundColor: "#fff",
      }}
      // renderActions={renderCustomActions}
      alwaysShowSend={true}
      renderSend={renderSend}
      parsePatterns={parsePatterns}
      renderAccessory={ renderAccessory}
    />
  );
};

export default Chat;
