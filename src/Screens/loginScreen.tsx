import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  View,
} from "react-native";
import React from "react";
import { CoButton, CoInput } from "../components";
import { firebaseAuth, theme } from "../constants";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/RootStack";
import * as firebase from "firebase/auth";
import { useDispatch } from "react-redux";
import { IUser, IUserCredential, onLogin } from "../redux/authSlice";

const LoginScreen = () => {
  const [userInfo, setUserInfo] = React.useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState<boolean>(false);

  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  React.useEffect(() => {
    const unSubscribe = firebaseAuth.beforeAuthStateChanged((user) => {
      if (user) {
        navigate("Home");
      }
    });

    return unSubscribe;
  }, []);

  const onHandleLogin = React.useCallback(async () => {
    setLoading(true);
    if (userInfo.email === "") {
      Alert.alert("Không được để trống");
      return;
    }
    await firebase
      .signInWithEmailAndPassword(
        firebaseAuth,
        userInfo.email,
        userInfo.password
      )
      .then((userCredentials) => {
        if (!userCredentials) {
          Alert.alert("Đăng nhập không thành công");
        } else {
          const user = userCredentials.user;
          user.providerData.forEach((profile) =>{
            console.log("Sign-in provider: " + profile.providerId);
            console.log("  Provider-specific UID: " + profile.uid);
            console.log("  Name: " + profile.displayName);
            console.log("  Email: " + profile.email);
            console.log("  Photo URL: " + profile.photoURL);
          })
          
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [userInfo]);

  {
    loading && (
      <View>
        <ActivityIndicator size={"large"} color={theme.COLORS.GRADIENT_START} />
      </View>
    );
  }

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
          onChangeText={(email: string) =>
            setUserInfo((prev) => ({
              ...prev,
              email: email,
            }))
          }
          value={userInfo.email}
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
          onPress={onHandleLogin}
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
