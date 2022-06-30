import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert} from 'react-native';

import { styles } from '../styles/styles';

const NoteInput = props => {
    const [enteredDescription, setDescription] = useState();
    const [enteredAmount, setAmount] = useState();
    const [buttonTextValue, setButtonTextValue] = useState('SAVE');

    let { item, buttonText } = props.route.params

    const amountInputHandler = (value) => {
        setAmount(value);
    }
    const descriptionInputHandler = (value) => {
        setDescription(value);
    }

    const saveItemHandler = () => {
        if (buttonText == 'SAVE') {
            props.onSaveItem(enteredDescription, enteredAmount);
        } else {
            props.onUpdateItem(item.key, enteredDescription, enteredAmount);
        }
        setDescription("");
        setAmount("");
        successAlert();
    }

    React.useLayoutEffect(() => {
        setButtonTextValue(buttonText);
        if (buttonText == 'UPDATE') {
            setDescription(item.value.description);
            setAmount(item.value.amount);
        }
    }, []);

    const successAlert = () => {
        Alert.alert(
            'SUCCESS',
            'Note saved Successfully',
            [
                {
                    text: 'OK',
                    onPress: () => props.navigation.navigate('Home')
                },
            ],
            { cancelable: false },
        );
    }

    return (
        <View style={styles.noteInputcontainer}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={descriptionInputHandler}
                    value={enteredDescription} />
                <Text style={styles.label}>Note</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={amountInputHandler}
                    value={enteredAmount} />
            </View>
            <View style={styles.buttonContainer} >
                <View style={styles.button} ><Button title={buttonTextValue} onPress={saveItemHandler} color='black' /></View>
            </View>
        </View>
    )
}

export default NoteInput; 