import {StyleSheet, SafeAreaView} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import BottomNavigation from './src/components/BottomNavigation'
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Provider} from "react-native-paper";

export default function App() {
    return (
        <GestureHandlerRootView style={styles.container}>
            <SafeAreaView style={styles.container}>
                <Provider>
                    <NavigationContainer>
                        <BottomNavigation/>
                    </NavigationContainer>
                </Provider>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
