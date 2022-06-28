import { Dimensions, StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../Screens/HomeScreen";
import LoginScreen from "../Screens/loginScreen";
import Checkin from "../Screens/Drawer/Checkin";
import Menu from "./Menu";
import MailScreen from "../Screens/Drawer/MailScreen";
import Main from "../Screens/Drawer/Main";
import Approval from "../Screens/Drawer/Approval";

export type HomeDrawerParamsList = {
  Main: undefined;
  MailScreen: undefined;
  CheckIn: undefined;
  Approval:undefined
};

export type RootStackParamList = {
  LoginScreen: undefined;
  Home: undefined;
  CheckInScreen: undefined;
  MailScreen: undefined;
 
};
const { width } = Dimensions.get("screen");
const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<HomeDrawerParamsList>();

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const Home = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      screenOptions={{
        drawerType: "back",
        swipeEdgeWidth: 200,
        drawerActiveTintColor: "white",
        drawerInactiveTintColor: "#000",
        drawerStyle: {
          backgroundColor: "white",
          width: width * 0.8,
        },
        drawerItemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden",
        },
        drawerLabelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal",
        },
      }}
      drawerContent={(props) => <Menu {...props} />}
    >
      <Drawer.Screen
        name="Main"
        component={Main}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="CheckIn"
        component={Checkin}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="MailScreen"
        component={MailScreen}
        options={{
          headerShown: false,
        }}
      />
       <Drawer.Screen
        name="Approval"
        component={Approval}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

export default RootStack;

const styles = StyleSheet.create({});