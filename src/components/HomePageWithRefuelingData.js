import React from 'react'
import { StyleSheet, View  , Text , Pressable} from 'react-native'
import WhiteBox from './WhiteBox'
import BarChart from './BarChart'
import { Refueling } from '../Database/models/RefuelingSchema'
import RefuelingCard from './RefuelingCard'
const HomePageWithRefuelingData = ({priceChartData , mileage , avMileage , latestRefuelingData , navigation }) => {
    console.log(latestRefuelingData);
  return (
    <View style={styles.container}>
        <Text style={styles.subHeading}>Fuel insights</Text>
        <View style={styles.whiteBoxContainer}>
            <WhiteBox text="Avg Fuel Consumption" value={`${mileage} Km/l`}/>
            <WhiteBox text="Avg Fuel Consumption" value={`${avMileage} Km/l`}/>
            
        </View>
        <BarChart priceChartData={priceChartData} />

        <View style={styles.refuelingTextContainer}>
            <Text style={styles.subHeading}>Refuelling history</Text>
            <Pressable styles={styles.seeAllContainer}>
            <Text style={styles.seeAll}>See all {'>'}</Text>
            </Pressable>
        </View>
        <View style={styles.refuelingContainer}>
        {
            latestRefuelingData.map((data , index)=>(
                <RefuelingCard navigation={navigation} data={data} key={index}/>
            ))
        }
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container :{
        marginTop : 40
    },
    subHeading : {
        color : '#0B3C58',
        fontSize : 16,
        fontWeight : 'bold',
        marginBottom : 10,
        paddingLeft : 15
    },whiteBoxContainer :{
        flexDirection : 'row',
        justifyContent : 'space-between',
        paddingHorizontal: 20,
        paddingVertical :16,
        backgroundColor :'#F0F2F2'
    },refuelingTextContainer : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        paddingRight : 15,
        marginTop : 40
    },seeAll :{
        color : '#B84646',
        fontSize : 14
    },refuelingContainer : {
        marginBottom : 20
    },seeAllContainer : {
        justifyContent : 'center'
    }
})

export default HomePageWithRefuelingData