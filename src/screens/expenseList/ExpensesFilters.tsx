import React, {useState} from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';
import {FormStyles} from "../../sharedStyles";
import DropDownPicker from "react-native-dropdown-picker";
import {useCategoryStore} from "../../store";
import {Button, TextInput} from "react-native-paper";


const ExpenseFilters = ({filterOptions, setFilterOptions}) => {
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const {categories} = useCategoryStore();
    const CategoryDropdownItems = [
        {
            label: 'All categories',
            value: 'All'
        },
        ...categories.map(category => (
            {
                label: category.name,
                value: category.name
            }))
    ];

    const handleFilterTextChange = (name: string) => {
        setFilterOptions(options => ({
            ...options,
            name,
        }));
    }

    const handleFilterCategoryChange = (category: string) => {
        setFilterOptions(options => ({
            ...options,
            category,
        }));
    }

    const handleSortChange = () => {
        setFilterOptions(options => ({
            ...options,
            sortByDate: !options.sortByDate,
        }));
    }

    const clearFilters = () => {
        setFilterOptions({
            name: '',
            category: 'All',
            sortByDate: false,
        });
        setSelectedCategory('All')
    }

    return (
        <View style={styles.container}>
            <DropDownPicker
                open={isCategoryDropdownOpen}
                value={selectedCategory}
                placeholder="Choose category"
                items={CategoryDropdownItems}
                setOpen={setIsCategoryDropdownOpen}
                onSelectItem={value => (handleFilterCategoryChange(value.value))}
                setValue={setSelectedCategory}
                textStyle={FormStyles.dropdownText}
                style={[FormStyles.dropdown]}
            />
            <TextInput
                mode="outlined"
                placeholder="Name"
                onChangeText={handleFilterTextChange}
                value={filterOptions.name}
                style={FormStyles.textInput}
            />
            <View style={styles.lastRow}>
                <View style={styles.order}>
                    <Text>Order descending by date</Text>
                    <Switch
                        value={filterOptions.sortByDate}
                        onValueChange={handleSortChange}
                    />
                </View>
                <Button onPress={clearFilters}>Clear filters</Button>
            </View>
        </View>
    );
}

export default ExpenseFilters;

const styles = StyleSheet.create({
    container: {
        paddingLeft: 12,
        paddingRight: 12,
        paddingBottom: 8,
    },
    lastRow: {
        marginTop: 8,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    order: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 4,
        gap: 10,
    }
})
