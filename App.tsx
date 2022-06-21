import { NavigationContainer } from "@react-navigation/native";

import { StatusBar } from "expo-status-bar";

import RootStack from "./src/navigation/RootStack";

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style="auto" hidden />
      <RootStack />
    </NavigationContainer>
  );
};
export default App;
