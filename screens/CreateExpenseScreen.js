import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert, TouchableOpacity, DropDownPicker } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, addDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { styles } from '../styles/styles';

const NoteInput = props => {
    const [enteredDescription, setDescription] = useState();
    const [enteredAmount, setAmount] = useState();
    const [buttonTextValue, setButtonTextValue] = useState('SAVE');

    let { item, buttonText } = props.route.params

    const saveItemHandler = () => {
        if (buttonText == 'SAVE') {
            props.onSaveItem(enteredDescription, enteredAmount);
            saveToDatabase();

        } else {
            props.onUpdateItem(item.key, enteredDescription, enteredAmount);
            updateDatabase();
        }
        setDescription("");
        setAmount("");
        successAlert();
    }

    const saveToDatabase = async () => {
        try {
            const docRef = await addDoc(collection(db, "Expenses"), {
                description: enteredDescription,
                amount: enteredAmount,
                date: serverTimestamp()
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const updateDatabase = async () => {
        try {
            const expenseRef = doc(db, "Expenses", "DC");

            // Set the "capital" field of the city 'DC'
            await updateDoc(expenseRef, {
                description: enteredDescription,
                amount: enteredAmount,
            });

            console.log("Document updated");
        } catch (e) {
            console.error("Error updating document: ", e);
        }
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
        <View style={styles.expInputContainer}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => setDescription(value)}
                    value={enteredDescription} />
                <Text style={styles.label}>Amount ($)</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => setAmount(value)}
                    value={enteredAmount} />
                {/* <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder="Participants"
                /> */}
            </View>
            <View style={styles.buttonContainer} >

                <TouchableOpacity
                    onPress={saveItemHandler}
                    style={[styles.button,]}>
                    <Text style={styles.buttonText}>{buttonTextValue}</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default NoteInput; 