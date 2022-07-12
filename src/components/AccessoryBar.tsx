import {  StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  getLocationAsync,
  pickImageAsync,
  takePictureAsync,
} from "./medialUltils";
import { CoIcon } from ".";
import { theme } from "../constants";
import { IMessage } from "react-native-gifted-chat";

interface AccessoryBarProps {
    onSend: (images: { image: string; }[] ) => void ;
  isTyping: (isTyping:boolean) => void;
}

interface ButtonProps {
  onPress: () => {};
  size: number;
  color: string;
  name: string;
}
const Button = ({ onPress, size, color, name, ...props }: ButtonProps) => (
  <TouchableOpacity onPress={onPress}>
    <CoIcon size={size} color={color} family={"MaterialIcons"} name={name} />
  </TouchableOpacity>
);

const AccessoryBar = ({ onSend, isTyping }: AccessoryBarProps) => {
  return (
    <View style={styles.container}>
      <Button
        onPress={() => pickImageAsync(onSend)}
        name="photo"
        size={15}
        color={theme.COLORS.ICON}
      />
      <Button
        onPress={() => takePictureAsync(onSend)}
        name="camera"
        size={15}
        color={theme.COLORS.ICON}
      />
      <Button
        onPress={() => getLocationAsync()}
        name="my-location"
        size={15}
        color={theme.COLORS.ICON}
      />
      <Button
        onPress={() => !isTyping}
        name="chat"
        size={15}
        color={theme.COLORS.ICON}
      />
    </View>
  );
};

export default AccessoryBar;

const styles = StyleSheet.create({
  container: {
    height: 44,
    width: "100%",
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(0,0,0,0.3)",
  },
});
