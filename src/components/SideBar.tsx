import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";

import { theme } from "../constants";
import CoIcon from "./Icon";

import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";

interface DrawerItemProps {
  title: string;
  focused?: boolean;
  navigation: DrawerNavigationHelpers;
  value: string;
}

const SideBar = ({ title, focused, navigation, value }: DrawerItemProps) => {
  const renderIcon = () => {
    switch (title) {
      case "Main":
        return (
          <CoIcon
            name="shop"
            family="ArgonExtra"
            size={14}
            color={focused ? "white" : theme.COLORS.PRIMARY}
          />
        );
      case "CheckIn":
        return (
          <CoIcon
            name="clock"
            family="EvilIcons"
            size={14}
            color={focused ? "white" : theme.COLORS.ERROR}
          />
        );
      case "MailScreen":
        return (
          <CoIcon
            name="email"
            family="Fontisto"
            size={14}
            color={focused ? "white" : theme.COLORS.PRIMARY}
          />
        );
      case "Profile":
        return (
          <CoIcon
            name="chart-pie-35"
            family="ArgonExtra"
            size={14}
            color={focused ? "white" : theme.COLORS.WARNING}
          />
        );
      case "Approval":
        return(
          <CoIcon
          name="brush"
          family="Entypo"
          size={14}
          color={focused ? "white" : theme.COLORS.WARNING}
          
          />
        )
      default:
        return null;
    }
  };

  const containerStyles = [
    styles.defaultStyle,
    focused ? [styles.activeStyle, styles.shadow] : null,
  ];

  return (
    <TouchableOpacity
      style={{ height: 60 }}
      onPress={() => {
        navigation.navigate(title);
      }}
    >
      <View
        style={[
          containerStyles,
          {
            flex: 1,
            flexDirection: "row",
          },
        ]}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 0.1,
            marginRight: 5,
          }}
        >
          {renderIcon()}
        </View>
        <View style={styles.titleScreenDrawer}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: focused ? "bold" : "normal",
              color: focused ? "white" : "rgba(0,0,0,0.5)",
            }}
          >
            {value}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SideBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.ACTIVE,
  },
  textStyle: {
    margin: 12,
    fontSize: 16,
    textAlign: "center",
    padding: 10,
  },
  defaultStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  activeStyle: {
    backgroundColor: theme.COLORS.ACTIVE,
    borderRadius: 4,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
  },
  titleScreenDrawer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 0.9,
  },
});
