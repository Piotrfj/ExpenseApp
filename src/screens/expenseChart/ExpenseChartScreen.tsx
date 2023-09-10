import React from 'react';
import Chart from "./Chart";
import {Divider} from "react-native-paper";
import {useExpensesStore} from "../../store";
import {ScrollView, View} from "react-native";
import dayjs from 'dayjs'
import {Expense} from "../../types";
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat)

function ExpenseChartScreen() {
    const {expenses} = useExpensesStore();
    const convertDataForChart = (data: Expense[]) => {
        return Array.from(data.reduce(
            (m, {category, amount}) => m.set(category, (m.get(category) || 0) + Number(amount)), new Map
        ), ([category, amount]) => ({category, amount})).map((item, i, array) => ({
            name: item.category,
            amount: item.amount,
            color: `hsl(${i / array.length * 360}, 70%, 50%)`,
            legendFontColor: 'black',
            legendFontSize: 15,
        }));
    }

    const currentMonth = dayjs().month()
    const currentMonthData = convertDataForChart(expenses.filter(expense => dayjs(expense.date, 'DD.MM.YYYY').month() === currentMonth));

    const lastMonth = dayjs().month() - 1;
    const lastMonthData = convertDataForChart(expenses.filter(expense => dayjs(expense.date, 'DD.MM.YYYY').month() === lastMonth));

    const allData = convertDataForChart(expenses)

    return (
        <View>
            <ScrollView>
                {currentMonthData.length > 0 && (
                    <>
                        <Chart data={currentMonthData} label='Current Month'/>
                        <Divider/>
                    </>
                )}
                {lastMonthData.length > 0 && (
                    <>
                        <Chart data={lastMonthData} label='Last Month'/>
                        <Divider/>
                    </>
                )}
                {allData.length > 1 && (
                    <Chart data={allData} label='All Data'/>
                )}
            </ScrollView>
        </View>
    );
}

export default ExpenseChartScreen;
