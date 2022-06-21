import { GestureResponderEvent, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'




interface ButtonProps {
    onPress:((event: GestureResponderEvent) => void) | undefined;
    buttonStyle:ViewStyle,
    title:string
    textStyle:TextStyle,
   
}


const CoButton = ({onPress,buttonStyle,title,textStyle}:ButtonProps) => {
  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
          <Text style={textStyle}>{title}</Text>
        </TouchableOpacity>
  )
}

export default CoButton

const styles = StyleSheet.create({})