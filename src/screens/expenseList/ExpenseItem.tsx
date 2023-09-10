import React from 'react';
import {Expense} from "../../types";
import {Text, View, StyleSheet} from "react-native";

const ExpenseItem = ({category, date, amount, name}: Expense) => {
    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.date}>{date}</Text>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.category}>{category}</Text>
            </View>
            <View><Text style={styles.amount}>{Number(amount).toFixed(2)}zł</Text></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        padding: 8,
    },
    infoContainer: {
        display: 'flex',
        gap: 2,
        maxWidth: '70%',
    },
    date: {
        fontSize: 10,
    },
    name: {
        fontSize: 16,
    },
    category: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    amount: {
        fontSize: 18,
    }
})

export default ExpenseItem;
