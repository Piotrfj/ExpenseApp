import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNavigation} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ExpenseListScreen from "../screens/expenseList/ExpenseListScreen";
import ExpenseChartScreen from "../screens/expenseChart/ExpenseChartScreen";
import {CommonActions} from "@react-navigation/native";
import CategoriesScreen from "../screens/categoryList/CategoriesScreen";

const Tab = createBottomTabNavigator();

export default function MyComponent() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}
            tabBar={({navigation, state, descriptors, insets}) => (
                <BottomNavigation.Bar
                    navigationState={state}
                    safeAreaInsets={insets}
                    onTabPress={({route, preventDefault}) => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (event.defaultPrevented) {
                            preventDefault();
                        } else {
                            navigation.dispatch({
                                ...CommonActions.navigate(route.name, route.params),
                                target: state.key,
                            });
                        }
                    }}
                    renderIcon={({route, focused, color}) => {
                        const {options} = descriptors[route.key];
                        if (options.tabBarIcon) {
                            return options.tabBarIcon({focused, color, size: 24});
                        }
                        return null;
                    }}
                    getLabelText={({route}) => {
                        const {options} = descriptors[route.key];
                        return options.tabBarLabel as string;
                    }}
                />
            )}
        >
            <Tab.Screen
                name="Expenses"
                component={ExpenseListScreen}
                options={{
                    tabBarLabel: 'Expenses',
                    tabBarIcon: ({color, size}) => {
                        return <Icon name="cash" size={size} color={color}/>;
                    },
                }}
            />
            <Tab.Screen
                name="Categories"
                component={CategoriesScreen}
                options={{
                    tabBarLabel: 'Categories',
                    tabBarIcon: ({color, size}) => {
                        return <Icon name="database" size={size} color={color}/>;
                    },
                }}
            />
            <Tab.Screen
                name="Chart"
                component={ExpenseChartScreen}
                options={{
                    tabBarLabel: 'Charts',
                    tabBarIcon: ({color, size}) => {
                        return <Icon name="chart-arc" size={size} color={color}/>;
                    },
                }}
            />
        </Tab.Navigator>
    );
}
