import React from 'react'
import { View , Image ,Text, StyleSheet, Pressable } from 'react-native'

const UserCard = ({image , data ,handlePress }) => {
  // console.log(data , "data");
  return (
    <Pressable style={styles.container} onPress={()=>handlePress(data)}>
        <Image style={styles.image} source={image}/>
        <Text numberOfLines={1} ellipsizeMode="tail"  style={styles.text}>{data.nickname || data.name}</Text>
    </Pressable>
  )
}


const styles = StyleSheet.create({
    container : {
      // backgroundColor : 'yellow',
      alignItems : 'center',
      width : 75,
      marginBottom : 10
    },image :{
        width : 60,
        height : 60
    },text : {
      Text: 'ellipsis'
    }
})
export default UserCard