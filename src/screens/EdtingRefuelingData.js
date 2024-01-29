import React, { useState } from 'react'
import { StyleSheet, View ,Text ,Image ,Button, Dimensions , Pressable} from 'react-native'
import BackButton from '../components/BackButton'
import useVehicleStore from '../state/Vehicles'
import moment from 'moment'
import TwoTexts from '../components/TwoTexts'
import { useRealm } from '@realm/react'
import ModalContainer from '../components/ModalContainer'
import { Refueling } from '../Database/models/RefuelingSchema'
const dayNames = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
const EdtingRefuelingData = ({route , navigation}) => {
    // console.log("route" ,route.params);
    const {data} = route.params
    // console.log(data)
    const {date , fuelConsumed , odometerStart , odometerEnd , price , curDate, _id} = data;
    const day = dayNames[date.getDay()];
    const {name} = useVehicleStore();
    const realm = useRealm();
    const [modalVisible , setModalVisible] = useState(false);
    const handleDelete = ()=>{
        setModalVisible(true);
        
    }
    const handleAccept = ()=>{
        const toDelete = realm.objects(Refueling).filtered('_id == $0' , _id);

        realm.write(()=>{
            realm.delete(toDelete);
        });
        navigation.navigate('refuelingInfo');
    }

    const handleReject = ()=>{
        setModalVisible(false);
    }

    
    const handleEdit = ()=>{
        navigation.navigate('editingRefuelingForm' , {info : data});
    }

  return (
    <View style={styles.container}>
        <ModalContainer modalVisible={modalVisible} modaltext="Are you sure you want to delete this refueling record" handleAccept={handleAccept} handleReject={handleReject}/>
        <View style={styles.top}>
            <View style={styles.toptop}>
                <BackButton navigation={navigation} />
                <Text style={[styles.text ,styles.textTop]}>{day}, {moment(date).format('D MMM \'YY')}</Text>
                <Pressable onPress={handleDelete}>
                    <Image source={require('../rcs/deleteRefueling.png')}/>
                </Pressable>
                
            </View>
            
            <Text style={[styles.text , styles.textMid]}>{name}</Text>
            <Text style={styles.textBot}>Added on {moment(curDate).format('D MMM \'YY')}</Text>
           

        </View>
        <View style={styles.middle}>
            <View style={styles.twoTextContainer}>
                <TwoTexts text1='Start Reading' text2={`${odometerStart} Kms`}/>
                <TwoTexts text1='End Reading' text2={`${odometerEnd} Kms`}/>
                <TwoTexts text1='Consumed' text2={`${fuelConsumed} L`}/>
                <TwoTexts text1='Price' text2={`S$${price}`}/>
            </View>
        </View>
        <View style={styles.bottom}>
            <Button onPress={handleEdit} title='Edit'/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : '#F0F2F2',
        flex : 1,
        alignItems : 'center'
    },toptop : {
        flexDirection : 'row',
        width : Dimensions.get('window').width,
        justifyContent : 'space-between',
        paddingHorizontal : 13,
    },top : {
        backgroundColor : 'white',
        justifyContent : 'space-between',
        alignItems : 'center',
        paddingTop : 36,
        paddingBottom : 20,
        width : Dimensions.get('window').width
    },text : {
        color : '#0B3C58',
        textAlign : 'center'
    },textTop :{
        fontSize : 22
    },textMid :{
        fontSize : 16,
        marginVertical : 13
    },textBot :{
        color : '#58798C',
        fontSize :12,
        textAlign : 'center'
    },middle :{
        alignItems : 'center',
        marginTop : 60
    },twoTextContainer : {
        width : 300,
        backgroundColor : 'white',
        borderRadius : 8,
        padding : 20
    },bottom :{
        position : 'absolute',
        bottom : 20,
        alignItems : 'center'
    }
})

export default EdtingRefuelingData