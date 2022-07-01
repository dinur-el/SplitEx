import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, Alert, TouchableOpacity } from 'react-native';
import { db } from '../firebaseConfig';
import { doc, collection, addDoc, updateDoc, deleteDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { styles } from '../styles/styles';
import DropDownPicker from 'react-native-dropdown-picker';

const CreateExpense = props => {
    const [enteredDescription, setDescription] = useState();
    const [enteredAmount, setAmount] = useState();
    const [buttonTextValue, setButtonTextValue] = useState('S A V E');
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);

    let { item, buttonText } = props.route.params

    var isToUpdate = (buttonText === 'U P D A T E') ? true : false;
    useEffect(() => {
        let unsubscribed = false;

        getDocs(collection(db, "ContactList"))
            .then((querySnapshot) => {
                if (unsubscribed) return; // unsubscribed? do nothing.

                const contacts = querySnapshot.docs
                    .map((doc) => ({
                        label: doc.data().name,
                        value: doc.id,
                    }));

                setItems(contacts);
                // setLoading(false);
            })
            .catch((err) => {
                if (unsubscribed) return; // unsubscribed? do nothing.

                // TODO: Handle errors
                console.error("Failed to retrieve data", err);
            });

        return () => unsubscribed = true;
    }, []);

    const saveItemHandler = () => {
        if (buttonText == 'S A V E') {
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
            const expenseRef = doc(db, "Expenses", item.key);

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

    const deleteDatabase = async () => {
        try {
            await deleteDoc(doc(db, "Expenses", "DC"));
            console.log("Document deleted");
            props.navigation.navigate('Home')
        } catch (e) {
            console.error("Error deleting document: ", e);
        }
    }

    React.useLayoutEffect(() => {
        setButtonTextValue(buttonText);
        if (buttonText == 'U P D A T E') {
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
                <Text style={styles.label}>Participants</Text>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder="Participants"
                />
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

           
            {isToUpdate &&

                <TouchableOpacity
                    onPress={deleteDatabase}
                    style={[styles.button,]}>
                    <Text style={styles.buttonText}>D E L E T E</Text>
                </TouchableOpacity>

            }
             </View>
        </View>
    )
}

export default CreateExpense; 