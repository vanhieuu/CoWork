import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import RootStack from "./src/navigation/RootStack";

import store from "./src/redux/store";
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="auto" hidden />
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
};
export default App;
