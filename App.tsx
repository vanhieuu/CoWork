import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import CoIcon from "./src/components/Icon";



const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar hidden  />
        <Text>Hello</Text>
        <CoIcon  name="user" family="AntDesign" color={"rgb(100,120,40)"} size={10}     />
    </View>
  );
}
export default App
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"center",
    alignItems:'center'
  },
});
