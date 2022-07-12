import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React, { useContext } from "react";

import { GiftedChatContext } from "react-native-gifted-chat/lib/GiftedChatContext";
import {
  getLocationAsync,
  pickImageAsync,
  takePictureAsync,
} from "./medialUltils";

export interface ActionPressProps {
  onSend: (images: { image: string; }[]) => void,
  wrapperStyle?: ViewStyle;
  iconTextStyle?: TextStyle;
  containerStyle?: ViewStyle;
  
}

const CustomActions = ({
  onSend,
  wrapperStyle,
  iconTextStyle,
  containerStyle,
  
}: ActionPressProps) => {
  const context = useContext(GiftedChatContext);
  const onActionPress = () => {
    const options = [
      "Choose From Library",
      "Take Picture",
      "Send Location",
      "Cancel",
    ];
    const cancelButtonIndex = options.length - 1;
    context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex: any) => {
        switch (buttonIndex) {
          case 0:
            pickImageAsync(onSend);
            return;
          case 1:
            takePictureAsync(onSend);
            return;
          case 2:
            getLocationAsync();
            return;
          default:
            return;
        }
      }
    );
  };

  const renderIcon = () => {
    return (
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onActionPress}
    >
      {renderIcon()}
    </TouchableOpacity>
  );
};

export default CustomActions;

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: "#b2b2b2",
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: "#b2b2b2",
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: "transparent",
    textAlign: "center",
  },
});
