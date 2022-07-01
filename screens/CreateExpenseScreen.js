import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { db } from '../firebaseConfig';
import { doc, collection, addDoc, updateDoc, deleteDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { styles } from '../styles/styles';
import DropDownPicker from 'react-native-dropdown-picker';

const CreateExpense = props => {
    const [enteredDescription, setDescription] = useState();
    const [enteredAmount, setAmount] = useState();
    const [buttonTextValue, setButtonTextValue] = useState('SAVE');
    const [openParticipants, setOpenParticipants] = useState(false);
    const [participantsValue, setParticipantsValue] = useState(null);
    const [participantsItems, setParticipantsItems] = useState([]);
    const [openTypes, setOpenTypes] = useState(false);
    const [typesValue, setTypesValue] = useState('individual');
    const [typesItems, setTypesItems] = useState([
        { label: 'Individual', value: 'individual' },
        { label: 'Shared', value: 'shared' }
    ]);

    let { item, buttonText } = props.route.params

    var isToUpdate = (buttonText === 'UPDATE') ? true : false;
    var isShared = (typesValue === 'shared') ? true : false;

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

                setParticipantsItems(contacts);
                // setLoading(false);
            })
            .catch((err) => {
                if (unsubscribed) return; // unsubscribed? do nothing.

                // TODO: Handle errors
                console.error("Failed to retrieve data", err);
            });

        return () => unsubscribed = true;
    }, []);

    const saveItemHandler = async () => {
        if (buttonText == 'SAVE') {
            let key = await saveToDatabase();
            props.onSaveItem(key, enteredDescription, enteredAmount);

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
            return docRef.id;
            
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
            await deleteDoc(doc(db, "Expenses", item.key));
            console.log("Document deleted");
            props.onDeleteItem(item.key);
            props.navigation.navigate('Home')
        } catch (e) {
            console.error("Error deleting document: ", e);
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
        <View style={styles.noteInputcontainer}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Type</Text>
                <DropDownPicker
                    open={openTypes}
                    value={typesValue}
                    items={typesItems}
                    setOpen={setOpenTypes}
                    setValue={setTypesValue}
                    setItems={setTypesItems}
                    placeholder="Individual"
                />
                {isShared &&
                    <View style={styles.buttonContainer} >
                        <Text style={styles.label}>Participants</Text>
                        <DropDownPicker
                            open={openParticipants}
                            value={participantsValue}
                            items={participantsItems}
                            setOpen={setOpenParticipants}
                            setValue={setParticipantsValue}
                            setItems={setParticipantsItems}
                            placeholder="Participants"
                        />
                    </View>
                }
                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => setDescription(value)}
                    value={enteredDescription} />
                <Text style={styles.label}>Amount</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => setAmount(value)}
                    value={enteredAmount} />
            </View>
            <View style={styles.buttonContainer} >
                <View style={styles.button} ><Button title={buttonTextValue} onPress={saveItemHandler} color='black' /></View>
            </View>
            {isToUpdate &&
                <View style={styles.buttonContainer} >
                    <View style={styles.button} ><Button title="DELETE" onPress={deleteDatabase} color='black' /></View>
                </View>
            }
        </View>
    )
}

export default CreateExpense; 