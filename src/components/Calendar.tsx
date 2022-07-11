import dayjs from "dayjs";
import React, { useState, Fragment, useCallback, useMemo } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Calendar, CalendarProps } from "react-native-calendars";
import * as Network from "expo-network";
import { testId, theme } from "../constants";

const INITIAL_DATE = new Date().toISOString().split("T")[0];

const INITIAL_IP_ADDRESS = "10.0.2.16";

const CalendarScreen = () => {
  const [selected, setSelected] = useState(INITIAL_DATE);
  const [dt, setDt] = React.useState(new Date().toISOString().split("T")[0]);
  const labelRef = React.useRef("Chấm công ");
  const [disable, setDisable] = React.useState<boolean>(true);

  const currentIpAddress = React.useRef<string>();

  const onDayPress: CalendarProps["onDayPress"] = useCallback((day) => {
    setSelected(day.dateString);
  }, []);

  React.useEffect(() => {
    const getNetWork = async () => {
      await Network.getIpAddressAsync().then((res) => {
        console.log(res);
        currentIpAddress.current = res;
      });
    };
    getNetWork();
  }, []);

  React.useEffect(() => {
    let secTimer = setInterval(() => {
      setDt(
        dayjs(new Date().toISOString())
          .locale("vi")
          .format("HH:mm:ss a")
          .toUpperCase()
      );
    }, 1000);

    return () => clearInterval(secTimer);
  }, []);

  const onPressCheckIn = React.useCallback(() => {
    if (labelRef.current === "Chấm công") {
      labelRef.current = "Kết thúc ca";
      if (
        labelRef.current === "Kết thúc ca" &&
        dayjs(new Date()).format("HH:mm") > "24"
      ) {
        setDisable(true);
      }
    } else {
      labelRef.current = "Chấm công";
    }
    console.log(labelRef.current);
  }, []);

  const marked = useMemo(() => {
    return {
      [selected]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: "#70d7c7",
        selectedTextColor: theme.COLORS.DEFAULT,
        marked: true,
        dotColor: theme.COLORS.ACTIVE,
        startingDay: true,
      },
    };
  }, [selected]);

  const renderCalendarWithSelectableDate = () => {
    return (
      <Fragment>
        <View style={[styles.calendar]}>
          <Calendar
            testID={testId.calendars.FIRST}
            enableSwipeMonths
            current={INITIAL_DATE}
            style={styles.calendar}
            onDayPress={onDayPress}
            markedDates={marked}
            markingType="dot"
            theme={{
              textInactiveColor: "#a68a9f",
              textSectionTitleDisabledColor: "grey",
              textSectionTitleColor: "#319e8e",
              arrowColor: "#319e8e",
            }}
          />
        </View>
      </Fragment>
    );
  };

  return (
    <View>
      {renderCalendarWithSelectableDate()}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        {selected === new Date().toISOString().split("T")[0] && (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                borderWidth: 1,
                borderColor: theme.COLORS.BORDER_COLOR,
              }}
            >
              <Text
                style={{
                  fontSize: 40,
                  fontWeight: "bold",
                }}
              >
                {dt}
              </Text>
            </View>
            <View>
              <View
                style={{
                  borderWidth: 1,
                  //   borderColor: theme.COLORS.BORDER_COLOR,
                  borderRadius: 20,
                  marginTop: 40,
                  width: "100%",
                }}
              >
                <Text style={{ marginHorizontal: 20 }}>
                  Thời gian làm: 8:30 am{" "}
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  //   borderColor: theme.COLORS.BORDER_COLOR,
                  borderRadius: 20,
                  marginTop: 40,
                  width: "100%",
                }}
              >
                <Text style={{ marginHorizontal: 20 }}>
                  Thời gian tan: 18:00 pm{" "}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 40,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                borderRadius: 40,
                backgroundColor: theme.COLORS.ACTIVE,
                width: 200,
                height: 50,
              }}
            >
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                }}
                disabled={
                  currentIpAddress.current != INITIAL_IP_ADDRESS
                    ? true
                    : false || disable === true
                    ? true 
                    : false
                }
                onPress={onPressCheckIn}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: theme.COLORS.WHITE,
                  }}
                >
                  {labelRef.current}
                </Text>
              </TouchableOpacity>
            </View>
            {currentIpAddress.current != INITIAL_IP_ADDRESS && (
              <View style={styles.handleError}>
                <Text style={styles.textError}>
                  Bạn đang chấm công ngoài công ty {currentIpAddress.current},
                  vui lòng cho biết lý do
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  calendar: {
    marginBottom: 10,
    marginTop: 20,
  },
  handleError: {
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  textError: {
    color: "red",
    textAlign: "center",
  },
});
