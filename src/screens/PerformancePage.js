import { useQuery, useRealm } from '@realm/react';
import React from 'react'
import { View  ,Text, StyleSheet , ScrollView} from 'react-native'
import { Vehicles } from '../Database/models/VehiclesSchema';
import useUserStore from '../state/Users';
import { useState ,useEffect } from 'react';
import AddVehicle from '../components/AddVehicle';
import PerformanceWithVehicle from '../components/PerformanceWithVehicle';
import { Refueling } from "../Database/models/RefuelingSchema";
import useVehicleStore from "../state/Vehicles";

const months = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];
const PerformancePage = ({navigation}) => {
  const realm = useRealm();
    const [priceChartData , setPriceChartData] = useState(null)
    const {id} = useUserStore();
    const [userVehicles , setUservehicles] = useState([]);
    const allVehicles = useQuery(Vehicles);
    const allRefuelingData = useQuery(Refueling);
    const {vehId ,setVehicle } = useVehicleStore();
    const [isRefuelingData , setIsRefuelingData] = useState(false);
    const [mileageChartData , setMileageChartData] = useState(null);
    useEffect(()=>{
      getUservehicles();
      
    } , [allVehicles])

    useEffect(()=>{
      getRefuelingDataOfVeh();
    } , [vehId , allRefuelingData])

    const getUservehicles = ()=>{
      const curuserveh = realm.objects(Vehicles).filtered('userId == $0' , id);
      setUservehicles(curuserveh);
      if(!vehId && curuserveh.length > 0){
        setVehicle({name : curuserveh[0].name , type : curuserveh[0].type , engine : curuserveh[0].engine , userId : curuserveh[0].userId , vehId : curuserveh[0]._id , image : curuserveh[0].image});
      }
    }

    const navigateToVehicleForm = ()=>{
      navigation.navigate('Vehicles' , {screen: 'addVehiclesForm'})
    }
    
    const getRefuelingDataOfVeh = ()=>{
      const fiveMonthsAgo = new Date(new Date().getFullYear(), new Date().getMonth() - 4, 1);
      // console.log(vehId);
      if(vehId){
        // console.log("y");
        const curRefuelingData = realm.objects(Refueling).filtered('vehId == $0 AND date >= $1' ,vehId , fiveMonthsAgo).sorted('date');
        getPriceChartData(curRefuelingData);
        getMileageChartData(curRefuelingData)
      }
      
      // setVehRefuelingData(curRefuelingData);
    }

    const getPriceChartData = (curRefuelingData)=>{
      if(curRefuelingData.length > 0)
        setIsRefuelingData(true)
      else  
        setIsRefuelingData(false)
      let monthsArr =[0 , 0, 0 ,0 , 0 , 0, 0, 0 ,0 , 0 , 0 , 0]
      for(let i = 0;i<curRefuelingData.length ; i++){
          const month = curRefuelingData[i].date.getMonth();
          monthsArr[month] += curRefuelingData[i].price;
      }
      let arr = [];
      const curMonth = new Date().getMonth();
      for(let i = 4;i>=0;i--){
          const month = (curMonth - i + 12)%12 ;
          const obj = {month : months[month], price : monthsArr[month]}
          arr.push(obj);
      }
      setPriceChartData(arr);
    }

    const getMileageChartData = (curRefuelingData)=>{
      let dist =[0 , 0, 0 ,0 , 0 , 0, 0, 0 ,0 , 0 , 0 , 0]
      let fuelCon = [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0];
      for(let i = 0;i<curRefuelingData.length ; i++){
          const month = curRefuelingData[i].date.getMonth();
          dist[month] += (curRefuelingData[i].odometerEnd - curRefuelingData[i].odometerStart);
          fuelCon[month] += curRefuelingData[i].fuelConsumed;
      }
      let arr = [];
      const curMonth = new Date().getMonth();
      for(let i = 4;i>=0;i--){
          const month = (curMonth - i + 12)%12 ;
          const obj = {month :  months[month], mileage : parseFloat(fuelCon[month] === 0 ? 0 : (dist[month]/fuelCon[month]).toFixed(2))}
          arr.push(obj);
      }
      setMileageChartData(arr);

    }
    
    // console.log(userVehicles , priceChartData , mileageChartData,vehId);
  return (
   
      
    <View style={styles.container}>
      <Text style={styles.heading}>Performance</Text>
        <ScrollView style={styles.scrollContainer}>
        {
            userVehicles.length > 0 && priceChartData && mileageChartData ? 
            // <></>
             <PerformanceWithVehicle navigation={navigation} mileageChartData={mileageChartData} isRefuelingData={isRefuelingData} userVehicles={userVehicles} priceChartData={priceChartData}/>
            :
            (
                <View style ={styles.addVehicleContainer}>
                  <AddVehicle handlePress={navigateToVehicleForm}/>
                </View>
            )
            
        }
        </ScrollView>
    </View>
    )
  }

const styles = StyleSheet.create({
  container : {
      flex : 1,
      backgroundColor : '#F0F2F2',
  },
  headingContainer : {

  },
  heading : {
      textAlign : 'center',
      paddingVertical : 10,
      fontSize : 30,
      color : '#0B3C58',
      borderBottomWidth :0.5,
      borderColor : 'gray'
      
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
  },addVehicleContainer :{
    justifyContent : 'center',
    // backgroundColor : 'red',
    marginTop : '50%',
    paddingHorizontal : 60
  },scrollContainer :{
    flex :1,
    // backgroundColor :'yellow'
  }
})




export default PerformancePage