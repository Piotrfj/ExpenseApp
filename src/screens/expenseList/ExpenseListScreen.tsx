import React, {useRef} from 'react';
import {ScrollView, StyleSheet, Text} from "react-native";
import {Divider, IconButton, MD3Colors} from "react-native-paper";
import {BottomSheetModal, BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {useExpensesStore} from "../../store";
import ExpenseForm from "./ExpenseForm";
import ExpenseItem from "./ExpenseItem";

function ExpenseListScreen() {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    // @ts-ignore
    const openModal = () => bottomSheetModalRef.current.present();

    const {expenses} = useExpensesStore();

    return (
        <BottomSheetModalProvider>
            <Text style={styles.screenTitle}>Expenses</Text>

            <ScrollView style={styles.list}>
                {expenses.map((item, i) => (
                    <>
                        {i > 0 && <Divider/>}
                        <ExpenseItem {...item} key={item.id}/>
                    </>
                ))}
            </ScrollView>

            <IconButton
                icon="plus"
                iconColor={MD3Colors.error50}
                size={35}
                mode="contained"
                onPress={openModal}
                style={styles.plusButton}
            />

            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={0}
                snapPoints={['85%']}
            >
                <ExpenseForm/>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}

const styles = StyleSheet.create({
    screenTitle: {
        fontSize: 24,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 10,
    },
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    list: {
        paddingBottom: 50,
    },
    contentContainer: {
        padding: 20,
    },
    plusButton: {
        position: "absolute",
        right: 10,
        bottom: 10,
    }
});

export default ExpenseListScreen;
