import * as Linking from "expo-linking";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import { Alert } from "react-native";
import { IMessage } from "react-native-gifted-chat";
import { useDispatch } from "react-redux";
import { onGetImage } from "../redux/chatSlice";
import { addDoc, collection } from "firebase/firestore";
import { dataBase } from "../constants";

interface MedialUrlProps {
  setMessage: React.Dispatch<React.SetStateAction<IMessage[]>>
}

export default async function getPermissionAsync(
  permission: Permissions.PermissionType
) {
  const { status } = await Permissions.askAsync(permission);
  if (status !== "granted") {
    const permissionName = permission.toLowerCase().replace("_", " ");
    Alert.alert(
      "Cannot be done 😞",
      `If you would like to use this feature, you'll need to enable the ${permissionName} permission in your phone settings.`,
      [
        {
          text: "Let's go!",
          onPress: () => Linking.openURL("app-settings:"),
        },
        { text: "Nevermind", onPress: () => {}, style: "cancel" },
      ],
      { cancelable: true }
    );

    return false;
  }
  return true;
}

export async function getLocationAsync(
  // onSend: (locations: { location: Location.LocationObjectCoords }[]) => void,
  
) {



  if (await Location.requestForegroundPermissionsAsync()) {
    const location = await Location.getCurrentPositionAsync({});
    if (location) {
      // onSend([{ location: location.coords }])
      
      console.log(location)
    }
  }
}

export async function pickImageAsync(

  onSend: (images: { image: string }[]) => void 
 ) {
     

  if (await ImagePicker.requestMediaLibraryPermissionsAsync()) {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
    
    
      onSend([{ image: result.uri }])
      console.log(result.uri.substring(result.uri.lastIndexOf("/") + 1))
      
      return result.uri;
    }
  }
}

export async function takePictureAsync(
  onSend: (images: { image: string }[]) => void
) {

  if (await ImagePicker.requestCameraPermissionsAsync()) {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      onSend([{ image: result.uri.substring(result.uri.lastIndexOf("/") + 1) }])
      console.log(result.uri.substring(result.uri.lastIndexOf("/") + 1));
     
      
      return result.uri.substring(result.uri.lastIndexOf("/") + 1);
      
    }
    
  }
}
