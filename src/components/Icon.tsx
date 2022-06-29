import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import * as Font from "expo-font";
import argonConfig from "../../assets/config/argon.json";
import * as SplashScreen from "expo-splash-screen";
import { IconFamilyType, Icon } from "galio-framework";
const ArgonExtra = require("../../assets/font/argon.ttf");
const IconArgonExtra = createIconSetFromIcoMoon(
  argonConfig,
  "ArgonExtra",
  "argon.ttf"
);

interface IconProps {
  name: string;
  family: IconFamilyType | "ArgonExtra";
  size: number;
  color: string;
}

const CoIcon = ({ name, family, size, color, ...rest }: IconProps) =>{
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({ArgonExtra:ArgonExtra});
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(true);
      }
    }

    prepare();
    return undefined;
  }, []);

  const onLayoutRootView = React.useCallback(async () => {
    if (loading) {
      await SplashScreen.hideAsync();
    }
  }, [loading]);

  if (!loading) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView}>
      
        {family === "ArgonExtra" ? (
          <IconArgonExtra
          key={1}
            name={name}
            family={family}
            {...rest}
            size={size}
            color={color}
            style={{ marginRight: 5 }}
          />
        ) : (
          <Icon
            name={name}
            family={family}
            size={size}
            color={color}
            style={{
              marginRight: 5,
            }}
          />
        )}
      
    </View>
  );
};

export default CoIcon;


