import React, {useMemo, useState} from 'react';
import {View} from "react-native";
import {useCategoryStore, useExpensesStore} from "../../store";
import {Controller, useForm} from "react-hook-form";
import {Expense} from "../../types";
import dayjs from "dayjs";
import {DatePickerInput} from "react-native-paper-dates";
import DropDownPicker from "react-native-dropdown-picker";
import {Button, TextInput} from "react-native-paper";
import uuid from 'react-native-uuid';
import {FormStyles} from "../../sharedStyles";

type ExpenseFromData = Omit<Expense, 'id' | 'amount'> & { amount: string };

function ExpenseForm() {
    const {addExpense} = useExpensesStore();

    const {categories} = useCategoryStore();
    const CategoryDropdownItems = categories.map(category => (
        {
            label: category.name,
            value: category.name
        }))
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

    const [inputDate, setInputDate] = React.useState(new Date())
    const maxDate = useMemo(() => new Date(), []);

    const {
        control,
        handleSubmit,
        formState: {errors},
        reset,
        setFocus
    } = useForm({
        defaultValues: {
            category: '',
            name: '',
            amount: '',
            date: dayjs(inputDate).format('DD.MM.YYYY'),
        }
    });

    const onSubmit = (data: ExpenseFromData) => {
        addExpense({
            ...data,
            id: uuid.v4() as string,
            amount: Number(data.amount),
        });
        setFocus('name', {shouldSelect: true});
        reset({
            date: data.date,
            category: data.category,
        });
    }

    return (
        <View style={FormStyles.contentContainer}>
            <Controller
                control={control}
                render={({field: {onChange}}) => (
                    <DatePickerInput
                        locale="pl"
                        label="Data"
                        testID={'data-test'}
                        value={inputDate}
                        onChange={(value) => {
                            setInputDate(value as Date);
                            onChange(dayjs(value).format('DD.MM.YYYY'))
                        }}
                        inputMode="start"
                        mode="outlined"
                        validRange={{endDate: maxDate}}
                    />
                )}
                name="date"
            />

            <Controller
                control={control}
                render={({field: {onChange}}) => (
                    <DropDownPicker
                        open={isCategoryDropdownOpen}
                        value={selectedCategory}
                        placeholder="Choose category"
                        testID={'category-test'}
                        items={CategoryDropdownItems}
                        setOpen={setIsCategoryDropdownOpen}
                        onChangeValue={value => onChange(value)}
                        setValue={setSelectedCategory}
                        textStyle={FormStyles.dropdownText}
                        style={[FormStyles.dropdown, errors.category ? FormStyles.dropdownError : []]}
                    />
                )}
                rules={{required: true}}
                name="category"
            />

            <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                        mode="outlined"
                        placeholder="Name"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        error={!!errors.name}
                        style={FormStyles.textInput}
                    />
                )}
                rules={{required: true, maxLength: 100}}
                name="name"
            />

            <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                        mode="outlined"
                        placeholder="Amount"
                        keyboardType='numeric'
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        error={!!errors.amount}
                        style={FormStyles.textInput}
                    />
                )}
                rules={{required: true, pattern: /^(\d+(?:\.\d{1,2})?)$/}}
                name="amount"
            />

            <Button icon="plus"
                    mode="contained"
                    onPress={handleSubmit(onSubmit)}
                    style={FormStyles.confirmButton}
            >Add Expense</Button>
        </View>
    )

}

export default ExpenseForm;
