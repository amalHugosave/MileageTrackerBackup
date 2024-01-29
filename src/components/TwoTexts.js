import React from 'react'
import { StyleSheet, View ,Text } from 'react-native'

const TwoTexts = ({text1 , text2}) => {
  return (
    <View style={styles.container}>
        <Text>{text1}</Text>
        <Text>{text2}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginVertical : 8
    }
})

export default TwoTexts