import {

  TouchableOpacity,

  ViewStyle,
} from "react-native";
import React from "react";
import * as Icon from "@expo/vector-icons";
import { IconFamilyType } from "galio-framework";

interface IconProps {
  name: string;
  family: IconFamilyType;
  size: number;
  color: string;
  onPress?: () => void;
  style: ViewStyle;
}

const TouchableIcon = ({
  name,
  family,
  size,
  color,
  onPress,
  style,
}: IconProps) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Icon name={name} family={family} size={size} color={color} />
    </TouchableOpacity>
  );
};

export default TouchableIcon;
