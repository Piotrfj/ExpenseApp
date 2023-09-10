import {StyleSheet} from "react-native";
export const FormStyles = StyleSheet.create({
    contentContainer: {
        padding: 20,
    },
    dropdown: {
        marginTop: 8,
        borderRadius: 4,
        borderColor: 'rgb(121, 116, 126)',
        paddingLeft: 16,
    },
    dropdownText: {
        fontSize: 16,
        color: 'rgb(28, 27, 31)',
    },
    dropdownError: {
        borderWidth: 2,
        borderColor: 'rgb(179, 38, 30)',
    },
    plusButton: {
        position: "absolute",
        right: 10,
        bottom: 10,
    },
    confirmButton: {
        marginTop: 12,
    },
    textInput: {
        backgroundColor: 'white',
    },
});
