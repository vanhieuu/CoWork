import { NativeSyntheticEvent, StyleSheet, Text, TextInputSubmitEditingEventData, View, ViewStyle } from "react-native";
import React from "react";
import { theme } from "../constants";
import { Input } from "galio-framework";
import CoIcon from "./Icon";

interface InputProps {
  shadowless: boolean;
  success: boolean;
  error: boolean;
  placeHolder: string;
  name: string;
  onChangeText: (value: string) => void | undefined;
  value: string;
  style: ViewStyle;
  secureTextEntry: boolean;
 onSubmitEditing?: ((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void) | undefined
}
const CoInput = ({
  shadowless,
  success,
  error,
  placeHolder,
  name,
  onChangeText,
  value,
  style,
  onSubmitEditing,
  secureTextEntry,
}: InputProps) => {
  const inputStyles = [
    styles.input,
    !shadowless && styles.shadow,
    success && styles.success,
    error && styles.error,
    { ...style },
  ];
  return (
    <Input
      placeholder={placeHolder}
      placeholderTextColor={theme.COLORS.MUTED}
      style={inputStyles}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      value={value}
      color={theme.COLORS.HEADER}
      onSubmitEditing={onSubmitEditing}
      iconContent={
        <CoIcon
          size={14}
          color={theme.COLORS.ICON}
          name={name}
          family="AntDesign"
        />
      }
    />
  );
};

export default React.memo(CoInput);

const styles = StyleSheet.create({
  input: {
    borderRadius: 4,
    borderColor: theme.COLORS.BORDER,
    height: 44,
    backgroundColor: "#ffffff",
    marginHorizontal: 40,
    width: "80%",
    padding: 5,
    margin: 5,
  },
  success: {
    borderColor: theme.COLORS.INPUT_SUCCESS,
  },
  error: {
    borderColor: theme.COLORS.INPUT_ERROR,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 0.05,
    elevation: 2,
  },
});
