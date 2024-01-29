import React from "react"
import RNPickerSelect from 'react-native-picker-select';
import { useEffect , useState } from "react";
import { View ,StyleSheet ,Text ,Image} from "react-native";
import { useQuery , useRealm } from "@realm/react";
import { Vehicles } from "../Database/models/VehiclesSchema";
import useVehicleStore from "../state/Vehicles";
import useUserStore from "../state/Users";
import { VictoryBar, VictoryChart, VictoryTheme ,VictoryAxis ,VictoryLine , VictoryScatter} from "victory-native";
import AddRefuelingData from "./AddRefuelingData";
import BarChart from "./BarChart";

const priceYTickValues = [
    [{ x: 0, y: 0 },
    { x: 6, y: 0 }],
    [{ x: 0, y: 1000 },
    { x: 6, y: 1000 }],
    [{ x: 0, y: 2000 },
    { x: 6, y: 2000 }],
    [{ x: 0, y: 3000 },
    { x: 6, y: 3000 }],
    [{ x: 0, y: 4000 },
    { x: 6, y: 4000 }],
    [{ x: 0, y: 5000 },
    { x: 6, y: 5000 }],
    // Add more lines as needed
  ];

  const mileageYTickValues = [
    [{ x: 0, y: 0 },
    { x: 6, y: 0 }],
    [{ x: 0, y: 10 },
    { x: 6, y: 10 }],
    [{ x: 0, y: 20 },
    { x: 6, y: 20 }],
    [{ x: 0, y: 30 },
    { x: 6, y: 30 }],
    [{ x: 0, y: 40 },
    { x: 6, y: 40}],
    [{ x: 0, y: 50 },
    { x: 6, y: 50}],
    // Add more lines as needed
  ];
  
const PerformanceWithVehicle = ({navigation ,userVehicles , priceChartData , isRefuelingData , mileageChartData}) => {
    const realm = useRealm();
    const allVehicles = useQuery(Vehicles);
    const {vehId ,setVehicle} = useVehicleStore();
    
    const {id} = useUserStore();
    const [curUserVehicles , setCurUservehicles] = useState([]);
    
    // const [vehRefuelingData , setVehRefuelingData] = useState([]);
    const {image} = useVehicleStore();
    
    

    useEffect(()=>{
        getvehiclesOfUser();
        // getRefuelingDataOfVeh();
    } , [vehId])

     const data = [
    { month: 'sept', price: 13000 },
    { month: 'oct', price: 16500 },
    { month: 'nov', price: 14250 },
    { month: 'dec', price: 19000 }
  ];
    const getvehiclesOfUser = ()=>{
        let arr = [];
        userVehicles.map((veh)=>{
            arr.push({label : veh.name , value : veh._id});
            if(veh._id.equals(vehId)){
    
                const t = arr[0];
                arr[0] = arr[arr.length - 1];
                arr[arr.length - 1] = t;
            }
        })
        setCurUservehicles(arr)
    }
    const handleSelectChange = (value)=>{
        const obj = realm.objects(Vehicles).filtered('_id == $0' , value)[0];
        setVehicle({name : obj.name , type : obj.type , engine : obj.engine , userId : obj.userId , vehId : obj._id , image : obj.image});
    }

    const handlePressForAddFuel = ()=>{
        navigation.navigate('Refueling' , {screen : 'refuelingForm'}  )
    }

    console.log(mileageChartData[1].mileage);

  return (
    <View style={styles.container}>
        <Text style={styles.subHeading}>Choose the vehicle</Text>
        <RNPickerSelect
        style={{...pickerSelectStyles}}
        placeholder={{}}
        onValueChange={(value) => {handleSelectChange(value)}}
        items={curUserVehicles}
        />
        <Image style={styles.image} source={image.length > 300 ? { uri: `data:image/png;base64,${image}` } : {uri :image}}/>
        {
            isRefuelingData ?(
            <View >
                <BarChart priceChartData={priceChartData} />
                <Text style={styles.chartHeading}>Vehicle mileage performance</Text>
                <View style={styles.chart}>
                <VictoryChart padding={{ top: 30, right: 50, bottom: 50, left: 50 }} 
                domainPadding={20} width= {370}theme={VictoryTheme.material} >
                <VictoryAxis
                    style={{ axis: { stroke: "transparent" } ,
                    ticks : {stroke: "transparent"}}}
                    
                />
        
                 <VictoryAxis dependentAxis  
                 tickLength={0}
                 style={{ axis: { stroke: "transparent" } ,
                 ticks : {stroke: "transparent"}}}
                 tickValues={mileageYTickValues.map((item)=>item[0].y)}
                 tickFormat={mileageYTickValues.map((item) => `${item[0].y}`)}
                 />
                    <VictoryScatter
                        size={5}
                        style={{ data: { fill: "#EB655F" } }}
                        data={mileageChartData}
                        x="month"
                        y="mileage"
                    />
                    <VictoryLine
                        style={{
                        data: { stroke: "#EB655F" },
                        parent: { border: "1px solid #ccc"}
                        }}
                        x = "month"
                        y = "mileage"
                        data={mileageChartData}
                        interpolation="cardinal"
                    />
                    {mileageYTickValues.map((line, index) => {
                    return(
                    
                    <VictoryLine
                    key={index}
                    style={{ data: { stroke: "gray",strokeWidth : 0.5 } }}
                    data={line}
                    />
                )})}
                </VictoryChart>
                </View>
            </View>
        ):  <AddRefuelingData handlePress={handlePressForAddFuel}/> 
        }
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        alignItems : 'center'
    },
    image :{
        width: 345 ,
        height: 185,
        marginTop : 20,
        borderColor : 'white',
        borderWidth : 6,
        borderRadius : 10
    },subHeading :{
        textAlign : 'center',
        fontSize : 16,
        color : '#0B3C58'
        // backgroundColor :'red'
    },chartHeading : {
        fontSize : 16,
        color : '#0B3C58',
        paddingLeft:15,
        fontWeight:'bold',
        marginTop : 30
    },chart : {
        backgroundColor : 'white',
        margin : 10,
        width :350,
        alignItems : 'center',
        borderRadius : 8
    }
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        marginLeft : 109, 
        marginVertical : 10,
  
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 8,
      color: 'black',
      backgroundColor : 'white',
      width : 170,
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        marginLeft : 109, 
       marginVertical : 10,
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 2,
      borderColor: 'black',
      borderRadius: 8,
      color: 'black',
      backgroundColor : 'white',
      width : 170,
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });

export default PerformanceWithVehicle