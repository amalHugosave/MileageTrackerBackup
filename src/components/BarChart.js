import React from 'react'
import { StyleSheet, View ,Text} from 'react-native'
import { VictoryBar, VictoryChart, VictoryTheme ,VictoryAxis ,VictoryLine} from "victory-native";
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

const BarChart = ({priceChartData}) => {
  return (
    <View>
        <Text style={styles.chartHeading} >Money spend on fuel</Text>
        <View style={styles.ChartContainer}>
        <View style={styles.chart}>
            <VictoryChart padding={{ top: 30, right: 50, bottom: 50, left: 50 }}  domainPadding={20} width={370} theme={VictoryTheme.material}>
                <VictoryAxis
                    style={{ axis: { stroke: "transparent" } ,
                ticks : {stroke: "transparent"}}}
                />

                <VictoryAxis dependentAxis  
                tickLength={0}
                style={{ axis: { stroke: "transparent" } ,
                ticks : {stroke: "transparent"}}}
                tickValues={priceYTickValues.map((item)=>item[0].y)}
                tickFormat={priceYTickValues.map((item) => `${item[0].y/1000}K`)}
                />
                <VictoryBar animate data={priceChartData}
                style={{ data: { fill: "#EB655F" } }}
                x="month" y="price" />
                {priceYTickValues.map((line, index) => {
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
    </View>
    )
}
const styles = StyleSheet.create({
    chartHeading : {
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
        borderRadius : 8,
    },ChartContainer : {
        alignItems : 'center'
    }
})
export default BarChart