import React from 'react'
import { View  , StyleSheet , Text} from 'react-native'

const WhiteBox = ({text , value}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.heading}>{text}</Text>
        <Text style={styles.sub}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container :{
    backgroundColor :'white',
    padding : 10,
    borderRadius : 8,
    width : 170
  },heading :{
    fontSize : 16,
    marginBottom : 10,
    color : '#0B3C58',
    fontWeight : 'normal'
  },sub : {
    color : '#0B3C58',
    fontSize : 14,

  }
})

export default WhiteBox