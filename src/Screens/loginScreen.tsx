import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { CoButton, CoInput } from "../components";
import { theme } from "../constants";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/RootStack";

const LoginScreen = () => {
  const [userInfo, setUserInfo] = React.useState({
    userName: "",
    password: "",
  });
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 100,
          marginBottom: 20,
        }}
      >
        <Image
          source={require("../../assets/images/logo.png")}
          style={{
            width: 200,
            height: 200,

            // backgroundColor:'red',
          }}
          resizeMode="center"
        />
      </View>

      <View>
        <CoInput
          shadowless={false}
          success={false}
          secureTextEntry={false}
          error={false}
          placeHolder={"ID or User Name"}
          name={"user"}
          onChangeText={(userName: string) =>
            setUserInfo((prev) => ({
              ...prev,
              userName: userName,
            }))
          }
          value={userInfo.userName}
          style={{}}
        />
      </View>
      <View>
        <CoInput
          shadowless={false}
          success={false}
          error={false}
          secureTextEntry={true}
          placeHolder={"password"}
          name={"key"}
          onChangeText={(password: string) => {
            setUserInfo((prev) => ({
              ...prev,
              password: password,
            }));
          }}
          value={userInfo.password}
          style={{}}
        />
      </View>
      <View>
        <CoButton
          buttonStyle={styles.buttonStyle}
          textStyle={styles.textButton}
          onPress={() => {
            navigate("Home");
          }}
          title={"Login"}
        />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
  },
  buttonStyle: {
    backgroundColor: theme.COLORS.ACTIVE,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginHorizontal: 50,
    borderRadius: 20,
    marginTop: 20,
  },
  textButton: {
    color: "#fff",
    fontSize: theme.SIZES.BASE,
  },
});
