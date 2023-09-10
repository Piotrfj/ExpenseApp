import React from 'react';
import {View} from "react-native";
import {Controller, useForm} from "react-hook-form";
import {Button, TextInput} from "react-native-paper";
import {useCategoryStore} from "../../store";
import uuid from "react-native-uuid";
import {Category} from "../../types";
import {FormStyles} from "../../sharedStyles";

type CategoryForm = Omit<Category, 'id'>;
function CategoryForm() {
    const {addCategory} = useCategoryStore();

    const {control, register, handleSubmit, formState: {errors}, reset, setFocus} = useForm({
        defaultValues: {
            name: '',
        }
    });

    const onSubmit = (data: CategoryForm) => {
        addCategory({
            ...data,
            id: uuid.v4() as string,
        });
        setFocus('name', {shouldSelect: true});
        reset();
    };

    return (
        <View>
            <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                        mode="outlined"
                        placeholder="Category name"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        error={!!errors.name}
                    />
                )}
                rules={{ required: true, maxLength: 30}}
                name="name"
            />

            <Button style={FormStyles.confirmButton} icon="plus" mode="contained" onPress={handleSubmit(onSubmit)}>Add Category</Button>
        </View>
    );
}

export default CategoryForm;
