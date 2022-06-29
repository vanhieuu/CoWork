import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { TELEGRAM_BOT_TOKEN } from "../../constants/apiTelegram";
import {
  ResultTelegramResponse,
  TelegramBotResponse,
} from "../../constants/ultil";
import { useDispatch } from "react-redux";
import { onGetInfo } from "../../redux/telegramSlice";
const AddTask = () => {
  const [response, setResponse] = React.useState<TelegramBotResponse>();
    const dispatch = useDispatch()
  const getBotUpdates = () => {
    fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setResponse(json);
        dispatch(onGetInfo(json))
        console.log(json);
      });
  };

  return (
    <View>
      <TouchableOpacity onPress={getBotUpdates}>
        <Text>AddTask</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTask;

const styles = StyleSheet.create({});
