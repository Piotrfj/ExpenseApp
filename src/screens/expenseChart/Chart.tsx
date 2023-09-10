import React from 'react';
import {View, Text, Dimensions} from "react-native";
import {PieChart} from "react-native-chart-kit";

type ChartData = {
    name: string
    amount: number
    color: string
    legendFontColor: string
    legendFontSize: number
}[];

function Chart({data, label}: {data: ChartData, label: string}) {

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };
    const screenWidth = Dimensions.get("window").width;

    return (
        <View>
            <Text style={{textAlign: 'center', fontSize: 20, fontWeight: '500', marginTop: 10}}>{label}</Text>
            <PieChart
                data={data}
                width={screenWidth}
                height={150}
                chartConfig={chartConfig}
                accessor={"amount"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                center={[0, 0]}
                absolute
            />
        </View>
    )
}

export default Chart;
