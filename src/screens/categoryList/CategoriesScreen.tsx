import React, {useRef} from 'react';
import {ScrollView, StyleSheet, Text} from "react-native";
import {Divider, IconButton, MD3Colors} from "react-native-paper";
import {BottomSheetModal, BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {useCategoryStore} from "../../store";
import CategoryForm from "./CategoryForm";

function CategoriesScreen() {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    // @ts-ignore
    const openModal = () => bottomSheetModalRef.current.present();

    const {categories} = useCategoryStore();

    return (
        <BottomSheetModalProvider>
            <Text style={styles.screenTitle}>Categories</Text>
            <ScrollView>
                {categories.map((category, i) => (
                    <>
                        {i > 0 && <Divider />}
                        <Text style={styles.categoryItem} key={category.id}>{category.name}</Text>
                    </>
                ))}
            </ScrollView>

            <IconButton
                icon="plus"
                iconColor={MD3Colors.error50}
                size={35}
                mode="contained"
                onPress={openModal}
                style={styles.plusButton}
            />

            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={0}
                snapPoints={['80%']}
                style={styles.formContainer}
            >
                <CategoryForm />
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}

const styles = StyleSheet.create({
    screenTitle: {
        fontSize: 24,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 10,
    },
    formContainer: {
      padding: 20,
    },
    categoryItem: {
        padding: 12,
        fontSize: 20,
    },
    plusButton: {
        position: "absolute",
        right: 10,
        bottom: 10,
    }
});

export default CategoriesScreen;
