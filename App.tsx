import {StyleSheet, SafeAreaView, StatusBar, Platform} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import BottomNavigation from './src/components/BottomNavigation'
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Provider} from "react-native-paper";

export default function App() {
    return (
        <SafeAreaView style={styles.safeAreaViewContainer}>
            <GestureHandlerRootView style={styles.container}>
                <Provider>
                    <NavigationContainer>
                        <BottomNavigation/>
                    </NavigationContainer>
                </Provider>
            </GestureHandlerRootView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeAreaViewContainer: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
});
