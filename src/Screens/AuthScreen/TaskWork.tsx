import { Alert, Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/RootStack";
import CircularProgress from "react-native-circular-progress-indicator";
import { theme } from "../../constants";

const { width } = Dimensions.get("window");
const size = width - 32;
const strokeWidth = 50;
const radius = (size - strokeWidth) / 2;
const circumference = radius * 2 * Math.PI;

const TaskWork = () => {
  const route = useRoute<RouteProp<RootStackParamList, "TaskWork">>();
  const params = route.params;
  const [value, setValue] = React.useState(100);

  return (
    <View style={styles.container}>
      <Text>{params.task}</Text>
      <CircularProgress
        value={value}
        radius={40}
        titleFontSize={12}
        valueSuffix={"m"}
        inActiveStrokeColor={theme.COLORS.ACTIVE}
        inActiveStrokeOpacity={0.2}
        duration={60 * 1000}
        onAnimationComplete={() => {
          Alert.alert("Done");
        }}
      />
    </View>
  );
};

export default TaskWork;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
