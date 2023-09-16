import React, {useMemo, useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text} from "react-native";
import {Divider, IconButton, MD3Colors} from "react-native-paper";
import {BottomSheetModal, BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {useExpensesStore} from "../../store";
import ExpenseForm from "./ExpenseForm";
import ExpenseItem from "./ExpenseItem";
import ExpenseFilters from "./ExpensesFilters";
import dayjs from "dayjs";

interface FilterOptions {
    name: string,
    category: string,
    sortByDate: boolean,
}

function ExpenseListScreen() {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    // @ts-ignore
    const openModal = () => bottomSheetModalRef.current.present();

    const {expenses} = useExpensesStore();

    const [filterOptions, setFilterOptions] = useState<FilterOptions>({
        name: '',
        category: 'All',
        sortByDate: false,
    });

    let filteredData = expenses.filter(item => {
        if (filterOptions.category === 'All' || item.category === filterOptions.category) {
            return item.name.toLowerCase().includes(filterOptions.name.toLowerCase());
        }
        return false;
    });

    filteredData = useMemo(() => {
        if (filterOptions.sortByDate) {
            return filteredData.sort((a, b) => dayjs(a.date, 'DD.MM.YYYY').isAfter(dayjs(b.date, 'DD.MM.YYYY')) ? -1 : 1);
        } else {
            return filteredData.sort((a, b) => dayjs(a.date, 'DD.MM.YYYY').isAfter(dayjs(b.date, 'DD.MM.YYYY')) ? 1 : -1);
        }
    }, [filterOptions.sortByDate])

    return (
        <BottomSheetModalProvider>
            <Text style={styles.screenTitle}>Expenses list</Text>

            <ExpenseFilters filterOptions={filterOptions} setFilterOptions={setFilterOptions}/>

            <ScrollView style={styles.list}>
                {filteredData.map((item, i) => (
                    <>
                        {i > 0 && <Divider key={'divider-' + item.id}/>}
                        <ExpenseItem {...item} key={item.id}/>
                    </>
                ))}
            </ScrollView>

            <IconButton
                icon="plus"
                iconColor={MD3Colors.error50}
                size={35}
                mode="contained"
                testID={'add-button'}
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
        marginTop: 12,
    },
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    list: {
        paddingBottom: 50,
        zIndex: -1,
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
