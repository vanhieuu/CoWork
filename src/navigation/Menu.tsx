import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

import { Role, theme } from "../constants";
import { SideBar } from "../components";
import { DrawerContentComponentProps } from "@react-navigation/drawer";

const Menu = ({ navigation, state }: DrawerContentComponentProps) => {
  const screen = ["Main", "CheckIn", "MailScreen"];
 
  
  const screens = [
    {
      title:'Main',
      value:'Trang chủ',
      role:'admin'
    },
    {
      title:'CheckIn',
      value:'Chấm công',
      role: 'admin'
    },
    {
      title:'MailScreen',
      value:'Thông báo',
      role: 'admin'
    },
    {
      title:'Approval',
      value:'Duyệt công',
      role: 'admin'
    }
  ]

  
    
  




  return (
    <View style={styles.container}>
      <View style={[styles.header,{flex:0.6}]}>
        <Image
          style={styles.logo}
          source={require("../../assets/images/logo.png")}
        />
      </View>
      <View
        style={{
          flex: 1,
          paddingLeft: 8,
          paddingRight: 14,
        }}
      >
        <ScrollView
          style={{
            flex: 1,
          }}
          showsVerticalScrollIndicator={false}
        >
          {screens.map((item, index) => {
            return (
              
              <SideBar
                title={item.role === 'admin' ? item.title : ''}
                key={index}
                navigation={navigation}
                focused={state?.index === index ? true : false}
                value={item.role === 'admin' ? item.value : ''}
              />
            );
          })}
          <View
            style={{
              flex: 1,
              marginTop: 24,
              marginVertical: 8,
              marginHorizontal: 8,
            }}
          >
            <View
              style={{
                flex: 1,
                borderColor: "rgba(0,0,0,0.2)",
                width: "100%",
                borderWidth: StyleSheet.hairlineWidth,
              }}
            >
              <Text style={{ marginTop: 16, marginLeft: 8, color: "#8898AA" }}>
                DOCUMENTATION
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE*4,
    paddingTop: theme.SIZES.BASE ,
    justifyContent: "center",
    alignItems:'center',
    
  },
  logo: {
    width: "50%",
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    // backgroundColor:'red',
    height:20
  },
});
