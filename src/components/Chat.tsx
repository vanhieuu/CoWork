import { Linking } from "react-native";
import React, { useState, useLayoutEffect, useCallback } from "react";
import { Bubble, GiftedChat, IMessage } from "react-native-gifted-chat";
import {
  onSnapshot,
  collection,
  addDoc,
  orderBy,
  query,
} from "firebase/firestore";
import { firebaseAuth, dataBase, theme, app } from "../constants";

import AccessoryBar from "./AccessoryBar";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth } from "firebase/auth";

const Chat = () => {
  const [message, setMessage] = useState<IMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [resImage, setResImage] = useState([{}]);
  
  const getCurrentUser = getAuth(app).currentUser?.providerData
  console.log(getCurrentUser,'currentUser')
  const openImagePickerAsync = async () => {
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
        (res): void => {
          getDownloadURL(res.ref)
            .then((url) => {
              pickerResult.uri = url;
              setResImage([url]);
            })
            .then(() => {
              
              const newMess = message.map((item) => {
                return {
                  ...item,
                  image: pickerResult.uri,
                };
              });
              setMessage([...newMess]);
              console.log(resImage[0])
              
            });
        },
        (err) => {
          console.error(err);
        }
      );
    }
  };
  useLayoutEffect(() => {
    const collectionRef = collection(dataBase, "chats");
    const q = query(collectionRef, orderBy("createdAt",'desc'));
    const unSubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.docs) return null;
      if (resImage === undefined) return;
      setMessage(
        snapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          image: doc.data().image,
          user: doc.data().user,
        }))
      );
      
    });
    return unSubscribe;
  }, []);

  const onSend = useCallback((messages:IMessage[]) => {
    setMessage((prevMess: any) => GiftedChat.append(prevMess,messages));
    const { _id, createdAt, text, user, image } = messages[0];
    console.log(messages[0],'mess on 0')
    if(image === undefined ) {
      console.log(messages[0],'mess on 0')
      addDoc(collection(dataBase, "chats"), {
        _id,
        createdAt,
        text,
        user,
        
      });
    }else{
      console.log(messages[0],'mess on 1')
      addDoc(collection(dataBase, "chats"), {
        image:resImage
      });
    }
   
  }, []);

  // const renderCustomActions = () =>
  //   Platform.OS === "web" ? null : <CustomActions onSend={onSendFromUser} />;

  

  const renderAccessory = () => (
    <AccessoryBar
      onSend={(message) => onSend(message)}
      isTyping={() => setIsTyping(!isTyping)}
      pickerImage={openImagePickerAsync}
    />
  );

  return (
    <GiftedChat
      messages={message}
      onSend={(message) => onSend(message)}
      user={{
        _id: firebaseAuth!.currentUser!.email,
        avatar: 'https://i.pravatar.cc/150?img=3',
      }}
      messagesContainerStyle={{
        backgroundColor: "#f5f5f5",
        width:'100%',
      }}
      // renderActions={renderCustomActions}
      alwaysShowSend={true}
      showUserAvatar={true}
      renderAccessory={renderAccessory}
      showAvatarForEveryMessage={true}
      
      renderBubble={(props) => {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: "#efc100",
              },
              left: {
                marginLeft: -40,
              },
            }}
          />
        );
      }}
    />
  );
};

export default Chat;
