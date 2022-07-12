import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Chat from '../../components/Chat'

const MailScreen = () => {
  return (
    <View style={styles.container}>
      <Chat/>
    </View>
  )
}

export default MailScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    // backgroundColor:'red',
    // justifyContent:'center',
    
    
  }
})