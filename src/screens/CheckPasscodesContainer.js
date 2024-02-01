import React from 'react'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'
import CheckPassCode from './CheckPassCode'
const CheckPasscodesContainer = ({route}) => {
    const {user} = route.params;
    console.log(user)
  return (
    <View style={{flex :1}}>
        <CheckPassCode user={user}/>
    </View>
  )
}

const styles = StyleSheet.create({

})

export default CheckPasscodesContainer