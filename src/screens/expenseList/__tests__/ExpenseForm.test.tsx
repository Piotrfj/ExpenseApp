import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ExpenseForm from '../ExpenseForm';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Provider} from "react-native-paper";
import {NavigationContainer} from "@react-navigation/native";
import {SafeAreaView} from "react-native";
import {useExpensesStore} from "../../../store";

const Wrapper = children => (
    <SafeAreaView>
        <GestureHandlerRootView>
            <Provider>
                <NavigationContainer>
                    {children.children}
                </NavigationContainer>
            </Provider>
        </GestureHandlerRootView>
    </SafeAreaView>
)

const mockAddExpense = jest.fn();
jest.mock('../../../store', () => ({
    useExpensesStore: () => ({
        addExpense: mockAddExpense,
    }),
    useCategoryStore: () => ({
        categories: [{ name: 'Category 1', value: 'Category 1' }, { name: 'Category 2', value: 'Category 2' }],
    }),
}));

describe('ExpenseForm', () => {
    it('Add new expense', async () => {
        const {addExpense} = useExpensesStore();

        const { getByText,
            getByPlaceholderText,
            getByTestId } = render(
            <Wrapper>
                <ExpenseForm />
            </Wrapper>
        );

        const dateInput = getByTestId('data-test');
        const categoryDropdown = getByTestId('category-test');
        const nameInput = getByPlaceholderText('Name');
        const amountInput = getByPlaceholderText('Amount');
        const addButton = getByText('Add Expense');

        fireEvent.changeText(dateInput, '01.09.2023');
        fireEvent(categoryDropdown, 'onChangeValue', "Category 1");
        fireEvent.changeText(nameInput, 'Nowy wydatek');
        fireEvent.changeText(amountInput, '50.00');

        fireEvent.press(addButton);

        await waitFor(() => {
            expect(addExpense).toBeCalledTimes(1);
        });
    });
});
