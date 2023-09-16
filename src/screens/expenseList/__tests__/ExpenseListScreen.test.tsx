import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ExpenseListScreen from '../ExpenseListScreen';

// Mockowanie refa do BottomSheetModal
jest.mock('@gorhom/bottom-sheet', () => {
    const { View } = require('react-native');
    return {
        BottomSheetModalProvider: ({ children }: { children: React.ReactNode }) => (
            <View>{children}</View>
        ),
        BottomSheetModal: ({ children }: { children: React.ReactNode }) => (
            <View>{children}</View>
        ),
    };
});

// Testy
describe('ExpenseListScreen', () => {
    it('Otwieranie formularza po kliknięciu przycisku', () => {
        const { getByText, getByTestId } = render(
            <SafeAreaProvider>
                <ExpenseListScreen />
            </SafeAreaProvider>
                );

        // Sprawdzamy, czy przycisk "plus" istnieje
        const addButton = getByTestId('add-button');
        expect(addButton).toBeTruthy();

        // Klikamy przycisk "plus"
        fireEvent.press(addButton);

        // Sprawdzamy, czy formularz jest otwarty
        expect(getByText('Add Expense')).toBeTruthy();
    });
});
