import React from 'react'
import { StyleSheet, View , Image,Text, Pressable } from 'react-native'
import moment from 'moment'

const dayNames = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
const RefuelingCard = ({data , navigation}) => {
   const {date , fuelConsumed , price} = data;
    const day = dayNames[date.getDay()];
    const formattedDate = moment(date).format('D MMM \'YY');

    const handleNavigation = ()=>{
        // navigation.setOptions(data);
        navigation.navigate('Refueling' , {screen : 'editingRefuelingData' , params : {data} });
    }
  return (
    <Pressable onPress={handleNavigation} style={styles.container}>
            <View style={styles.top}>
                <Image source={require('../rcs/refuelingData.png')}/>
                <View style={styles.day}>
                    <Text style={[styles.text , styles.dayTop]}>{day} { formattedDate} </Text>
                    <Text style={[styles.text , styles.dayBottom]}>{fuelConsumed}L</Text>
                </View>
            </View>
            <Text style={[styles.text]}>+S${price}</Text>   
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        elevation : 4,
        margin  : 10,
        backgroundColor : 'white',
        padding : 15,
        borderRadius : 8,
        alignItems : 'center'
        // borderColor : 'black',
        // borderWidth : 2
        // backgroundColor : 'r4d'
        // alignItems : 'center'
    },text : {
        color : '#0B3C58'
    },top : {
        flexDirection : 'row',
        alignItems : 'center'
    },day :{
        paddingHorizontal : 16
    },dayTop :{
        fontSize : 14
    },dayBottom : {
        fontSize : 11
    }
})

export default RefuelingCard