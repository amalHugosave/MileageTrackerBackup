import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet ,Pressable , Image , ScrollView } from 'react-native'
import VehicleCard from '../components/VehicleCard'
import { useQuery, useRealm } from '@realm/react'
import { Vehicles } from '../Database/models/VehiclesSchema'
import useUserStore from '../state/Users'
import AddVehicle from '../components/AddVehicle'


const VehiclesInfo = ({navigation}) => {
  // const vehcles = [{name : 'Yamaha' , type : 2 , engine : 155 ,id : 1}];
  // console.log('z' , useQuery(Vehicles)[2].userId)
  const vehiclesInRealm = useQuery(Vehicles);
  const {id} = useUserStore();
  const realm = useRealm();
  const [vehcles , setVehcles] = useState([]);
  useEffect(()=>{
    const getVehcles = ()=>{
      // console.group("y" ,vehcles ,id)
      const uservehicles = realm.objects(Vehicles).filtered('userId == $0' , id);
      setVehcles(uservehicles);
      
    }
    getVehcles();
  } ,[vehiclesInRealm ])

  // console.log("y")
  
  const handlePress = ()=>{
    navigation.navigate('addVehiclesForm')
  }

  const navigateToForm = ()=>{
    navigation.navigate('addVehiclesForm')
  }

  return (
    
    <View style={styles.container}>
      {/* {console.log("z")} */}
        <Text style={styles.heading}>Vehicles</Text>
        
        {
          vehcles.length === 0 ?
          (
            <View style={styles.addvehicleContainer}>
              <AddVehicle handlePress={navigateToForm}/> 
            </View >
              ):(
            <ScrollView style={styles.cardContainer}>
            {
                vehcles.map((vehicle)=><VehicleCard key={vehicle._id} data={vehicle}/>)
            }
            </ScrollView>
           )
          }
          <Pressable onPress={handlePress} style ={styles.button}>
            <Image source={require('../rcs/AddUser.png')} />
          </Pressable>
        
        
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    // position :'absolute',
    flex : 1,
    backgroundColor : '#F0F2F2',
    // backgroundColor:'yellow'
  },heading : {
    fontSize : 25,
    color : '#0B3C58',
    textAlign : 'center',
    paddingVertical : 20,
    borderBottomColor : 'black',
    borderBottomWidth : 0.5,
    // backgroundColor : 'green'
  },cardContainer : {
      // alignItems : 'center',
      marginTop : 20,
      marginBottom : 50,
      // flex : 0.9
  },button : {
      position : 'absolute',
      bottom : 0,
      right : 0,
      // flex : 0.1,
      // width : 60,
      // backgroundColor : 'red'
  },addvehicleContainer :{
     flex : 1,
     justifyContent : 'center',
     padding : 30
  }
})

export default VehiclesInfo