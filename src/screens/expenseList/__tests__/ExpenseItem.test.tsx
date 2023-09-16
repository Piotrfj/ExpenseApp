import React from 'react';
import { render } from '@testing-library/react-native';
import ExpenseItem from '../ExpenseItem';
import {Expense} from "../../../types";

const sampleExpense: Expense = {
    category: 'Groceries',
    date: '13.09.2023',
    amount: 50,
    name: 'Grocery Shopping',
    id: 'some id'
};

test('ExpenseItem renders with correcy data', () => {
    const { getByText } = render(<ExpenseItem {...sampleExpense} />);

    expect(getByText('Groceries')).toBeTruthy();
    expect(getByText('13.09.2023')).toBeTruthy();
    expect(getByText('Grocery Shopping')).toBeTruthy();
    expect(getByText('50.00zł')).toBeTruthy();
});
