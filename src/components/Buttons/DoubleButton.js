import React from 'react'
import { StyleSheet, TouchableOpacity  } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import HollowButton from './HollowButton'
import CommonButton from './CommonButton'
import { Dimensions } from 'react-native'
const DoubleButton = ({textHollow, handlehollowPress, handleSolidPress,
solidDisabled , textSolid}) => {
  return (
    <SafeAreaView style={styles.container}>
        <HollowButton parentStyles={styles.ButtonStyles} text={textHollow}  handlePress={handlehollowPress}/>
        <CommonButton parentStyles={styles.ButtonStyles} text={textSolid} disabled={solidDisabled} handlePress={handleSolidPress}/>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container:{
        justifyContent :'space-between',
        flexDirection :'row',
        width : "100%",
        paddingHorizontal : 20
    },ButtonStyles :{
        width : '49%'
    }
})

export default DoubleButton