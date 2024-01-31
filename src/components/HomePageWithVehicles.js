import React, { useEffect } from 'react'
import { View ,Text , Image, StyleSheet} from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import AddRefuelingData from './AddRefuelingData';
import { useState } from 'react';
import { useQuery, useRealm } from '@realm/react';
import { Vehicles } from '../Database/models/VehiclesSchema';
// import  useVehicleStore from '../state/Vehicles'
import useVehicleStore from '../state/Vehicles';
import { Refueling } from '../Database/models/RefuelingSchema';
import HomePageWithRefuelingData from './HomePageWithRefuelingData';
// import 
// useVehicleStore
const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
const HomePageWithVehicles = ({vehiclesData ,navigation}) => {
    const AllVehicles = useQuery(Vehicles)
    const [vehicleSelectData , setvehicleSelectData] = useState([]);
    const {setVehicle  ,image ,vehId ,name ,  getState} = useVehicleStore();
    const allRefuelingData = useQuery(Refueling);
    const [mileage , setMileage] = useState(null);
    const [avMileage , setAvMileage] = useState(null);
    const [ priceChartData , setPriceChartData] = useState([]);
    const [latestRefuelingData , setLatestRefuelingData] = useState([]);
    const realm = useRealm();
    // console.log(vehId)
    const getSelectData = ()=>{
        let selectData = [];
        if(vehId == ''){
            setVehicle({name : vehiclesData[0].name , engine : vehiclesData[0].engine , vehId : vehiclesData[0]._id , userId : vehiclesData[0].userId , type : vehiclesData[0].type , image : vehiclesData[0].image});
        }
        vehiclesData.map((vehicleData) =>{
            
            selectData.push({label : vehicleData.name , value : vehicleData._id});
            if(vehicleData._id.equals(vehId)){
                const t = selectData[0];
                selectData[0] = selectData[selectData.length - 1];
                selectData[selectData.length - 1] = t;
            }
        })
        
        setvehicleSelectData(selectData);
    }

    useEffect(()=>{
        getSelectData();

    } , [AllVehicles , vehId])
  
      useEffect(()=>{
        getRefuelingDataOfVeh();
      } , [vehId , allRefuelingData])

      const getRefuelingDataOfVeh = ()=>{
        if(vehId){

            const fiveMonthsAgo = new Date(new Date().getFullYear(), new Date().getMonth() - 4, 1);
            const curRefuelingData = realm.objects(Refueling).filtered('vehId == $0 AND date >= $1' ,vehId , fiveMonthsAgo).sorted('date');
            getMileage();
            getPriceChartData(curRefuelingData);
            const lat = realm.objects(Refueling).filtered('vehId == $0' , vehId).sorted('date' , true).slice(0 , 5);
            setLatestRefuelingData(lat);
        }
        // setVehRefuelingData(curRefuelingData);
      }
  
      const getPriceChartData = (curRefuelingData)=>{
        // if(curRefuelingData.length > 0)
        //   setIsRefuelingData(true)
        // else  
        //   setIsRefuelingData(false)
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
  
      const getMileage = ()=>{
        const totalRef = realm.objects(Refueling).filtered('vehId == $0' , vehId).sorted('date');
        // console.log("length " ,totalRef.length);
        if(totalRef.length > 0){
          let res = 0;
          // console.log(totalRef);
          totalRef.map((data)=>{
              // console.log("data = " ,data)
              res += parseFloat((data.odometerEnd - data.odometerStart)/data.fuelConsumed);
          })
          // console.log(res);
          setAvMileage(parseFloat((res/totalRef.length).toFixed(2)));
          const obj = totalRef[totalRef.length - 1];
          setMileage(parseFloat(((obj.odometerEnd  - obj.odometerStart)/obj.fuelConsumed).toFixed(2)));
        }
  
      }

    
    const handleSelectChange = (value)=>{

        let obj = {}
        vehiclesData.map((vehicleData) => {
            
            if(vehicleData._id.equals(value) ){
                obj= vehicleData;
            }
        });
        setVehicle({name : obj.name , engine : obj.engine , vehId : obj._id , userId : obj.userId , type : obj.type , image : obj.image});

        // console.log(obj)
    }

    const handlePressForAddFuel = ()=>{
        navigation.navigate('Refueling' , {screen : 'refuelingForm'}  )
    }

    
    // console.log("x" , mileage);

  return (
    <View style={styles.container}>
        <Text style={styles.welcome}>Here is everything about your</Text>
        <RNPickerSelect
             placeholder={{}}
            // value={id}
            style={{...pickerSelectStyles}}
            onValueChange={(value) => handleSelectChange(value)}
            items={vehicleSelectData}
        />
        <View style={styles.imageContainer}>
        <Image style={styles.image} source={image.length > 300 ? { uri: `data:image/png;base64,${image}` } : {uri :image}}/>
        </View>
        {priceChartData.length > 0 && mileage && avMileage && latestRefuelingData.length > 0 ?
            <HomePageWithRefuelingData navigation={navigation} priceChartData={priceChartData} mileage={mileage} avMileage={avMileage} latestRefuelingData={latestRefuelingData}/>:
            <AddRefuelingData handlePress={handlePressForAddFuel} />
        }
    </View>
  )
}
const styles = StyleSheet.create({
  container : {
    marginBottom:30
  },
    imageContainer :{
        alignItems : 'center',
        
    },
    welcome : {
        fontSize : 18,
        textAlign : 'center'
    },image :{
        width: 354 ,
        height: 198,
        marginTop : 20,
        borderColor : "white",
        borderWidth : 8,
        borderRadius : 8
    }
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        marginLeft : 109,
        marginTop : 20,
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 8,
      color: 'black',
      backgroundColor : 'white',
      width : 170,
      paddingRight: 30,
      textAlign : 'center'
    },
    inputAndroid: {
        marginLeft : 109,
        marginTop : 20,
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 2,
      borderColor: 'black',
      borderRadius: 8,
      color: 'black',
      backgroundColor : 'white',
      width : 160,
      paddingRight: 30,
      textAlign : 'center',
      borderRadius : 5

    },
  });

export default HomePageWithVehicles