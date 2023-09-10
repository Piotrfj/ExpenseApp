import { create } from 'zustand'
import {Category, Expense} from "./types";
import uuid from "react-native-uuid";

const sampleCategories: Category[] = ['Food', 'Gas', 'Clothes', 'Bills', 'Gym'].map(item => ({name: item, id: uuid.v4() as string}));
const sampleExpenses: Expense[] = [
    {
        id: uuid.v4() as string,
        category: 'Gas',
        date: '01.09.2023',
        amount: 127,
        name: 'orlen'
    },
    {
        id: uuid.v4() as string,
        category: 'Gas',
        date: '02.09.2023',
        amount: 220,
        name: 'orlen'
    },
    {
        id: uuid.v4() as string,
        category: 'Food',
        date: '01.09.2023',
        amount: 20,
        name: 'kebab'
    },
    {
        id: uuid.v4() as string,
        category: 'Bills',
        date: '01.08.2023',
        amount: 67,
        name: 'prąd'
    },
];

interface ExpenseState {
    expenses: Expense[];
    addExpense: (newCategory: Expense) => void;
}
export const useExpensesStore = create<ExpenseState>((set) => ({
    expenses: sampleExpenses,
    addExpense: (newExpense: Expense) => set((state) => ({ expenses: [...state.expenses, newExpense] })),
}));

interface CategoryState {
    categories: Category[];
    addCategory: (newCategory: Category) => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
    categories: sampleCategories,
    addCategory: (newCategory: Category) => set((state) => {
        return ({ categories: [...state.categories, newCategory] })
    }),
}));
