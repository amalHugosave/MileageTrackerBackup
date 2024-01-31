import { useQuery, useRealm } from '@realm/react';
import React, { useEffect } from 'react'
import { View  ,Text, StyleSheet , Image ,Pressable ,Dimensions} from 'react-native'
import { Vehicles } from '../Database/models/VehiclesSchema';
import useUserStore from '../state/Users';
import { useState } from 'react';
import AddVehicle from '../components/AddVehicle';
import RNPickerSelect from 'react-native-picker-select';
import useVehicleStore from '../state/Vehicles';
import { Refueling } from '../Database/models/RefuelingSchema';
import RefuelingBox from '../components/RefuelingBox';
const RefuelingInfo = ({navigation}) => {
    const realm = useRealm();
    const {id} = useUserStore();
    const {vehId , name ,setVehicle} = useVehicleStore();
    const [userVehicles , setUservehicles] = useState([]);
    const allVehicles = useQuery(Vehicles);
    const [vehRefuelingData , setVehRefuelingData] = useState([]);
    const allRefuelingData = useQuery(Refueling);
    useEffect(()=>{
        getvehiclesOfUser();
        getRefuelingDataOfVeh();
    } , [allVehicles , vehId ,allRefuelingData])

    const getRefuelingDataOfVeh = ()=>{
        if(vehId)
        {
            const curRefuelingData = realm.objects(Refueling).filtered('vehId == $0' , vehId);
            setVehRefuelingData(curRefuelingData);
        }
    }
    const getvehiclesOfUser = ()=>{
        const curVehiclesOfUser = realm.objects(Vehicles).filtered('userId == $0' , id);
        let arr = [];
        curVehiclesOfUser.map((veh)=>{
            arr.push({label : veh.name , value : veh._id})

            if(vehId && veh._id.equals(vehId)){
    
                const t = arr[0];
                arr[0] = arr[arr.length - 1];
                arr[arr.length - 1] = t;
            }
        })

        if(curVehiclesOfUser.length > 0 && !vehId){
            setVehicle({name : curVehiclesOfUser[0].name , type : curVehiclesOfUser[0].type , engine : curVehiclesOfUser[0].engine , userId : curVehiclesOfUser[0].userId , vehId : curVehiclesOfUser[0]._id , image : curVehiclesOfUser[0].image});
        }
        setUservehicles(arr);
    }

    const handleSelectChange = (value)=>{
        const obj = realm.objects(Vehicles).filtered('_id == $0' , value)[0];
        // console.log(obj._id);
        setVehicle({name : obj.name , type : obj.type , engine : obj.engine , userId : obj.userId , vehId : obj._id , image : obj.image});
    }

    const navigateToVehicleForm = ()=>{
        navigation.navigate('vehicles' , {screen : 'addVehiclesForm'})
    }

    const navigateToRefuelingForm = ()=>{
        navigation.navigate('refuelingForm' );
    }
    console.log(vehRefuelingData)
  return (
    <View style={styles.container}>
        <View style={styles.headingContainer}>
            <Text style={styles.heading}>Refueling</Text>
            {
                userVehicles.length > 0 && (
                    <RNPickerSelect
                    style={{...pickerSelectStyles}}
                    placeholder={{}}
                    onValueChange={(value) => {handleSelectChange(value)}}
                    items={userVehicles}
                    />
                )
            }
        </View>
        {
            userVehicles.length == 0 ?
            (
                <View style={styles.addVehicle}>
                    <AddVehicle handlePress={navigateToVehicleForm}/>
                </View>
            ):vehRefuelingData.length == 0 ?(
        
                <View style={styles.noFuelContainer}>
                    <Image source={require('../rcs/clouds.png')}/>
                    <Text style={styles.noFuelHeading}>No refuelling records yet!</Text>
                    <Text style={styles.noFuelSub}>Add a record using the + button below to begin your wealthcare journey</Text>
                </View> 
            ): (<View style = {styles.refuelingDatas}>
                    <RefuelingBox navigation={navigation} data={vehRefuelingData}/>
                </View>
            )
                
        }
        <Pressable onPress={navigateToRefuelingForm} style ={styles.button}>
            <Image style={styles.image} source={require('../rcs/AddUser.png')} />
        </Pressable>
        
    </View>

  )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#F0F2F2',
        alignItems : 'center'
    },
    headingContainer : {
        borderBottomColor :' gray',
        borderBottomWidth :0.5,
        alignItems : 'center',
        width : Dimensions.get('window').width
    },
    heading : {
        textAlign : 'center',
        paddingVertical : 10,
        fontSize : 30,
        color : '#0B3C58',
        
    },
    addVehicle :{
        flex :1,
        justifyContent : 'center',
        paddingHorizontal : 20
    },noFuelContainer : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        paddingHorizontal : 40
    },
    noFuelHeading : {
        fontSize : 20,
        color : '#0B3C58',
        marginTop : 20,
        marginBottom : 10
    },noFuelSub : {
        textAlign : 'center',
        fontSize :15
    },button : {
        alignItems : 'flex-end',
        position : 'absolute',
        bottom : 0,
        right : 0
    },image : {
    },refuelingDatas : {

    }
})


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        marginLeft : 45,
        marginVertical : 10,

      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 8,
      color: 'black',
      backgroundColor : 'white',
      width : 300,
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        marginLeft : 45, 
       marginVertical : 10,
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 2,
      borderColor: 'black',
      borderRadius: 8,
      color: 'black',
      backgroundColor : 'white',
      width : 300,
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });

export default RefuelingInfo