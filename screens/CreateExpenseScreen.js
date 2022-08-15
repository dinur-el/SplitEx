import React, { useState, useEffect, useContext } from "react";
import { View, TextInput, Text, Alert, TouchableOpacity } from 'react-native';
import { db } from '../firebaseConfig';
import { doc, collection, collectionGroup, addDoc, updateDoc, deleteDoc, getDocs, serverTimestamp, getDoc } from "firebase/firestore";
import { styles } from '../styles/styles';
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import DropDownPicker from 'react-native-dropdown-picker';
import { UserContext } from '../context/user-context'

const CreateExpense = props => {
    const userCtx = useContext(UserContext);
    const [enteredDescription, setDescription] = useState("");
    const [enteredAmount, setAmount] = useState();

    // contactList
    const [participantsItems, setParticipantsItems] = useState([]);

    // selected participants for sharing
    const [selectedParticipants, setSelectedParticipants] = useState([]);

    const [openTypes, setOpenTypes] = useState(false);
    const [typesValue, setTypesValue] = useState('individual');
    const [typesItems, setTypesItems] = useState([
        { label: 'Individual', value: 'individual' },
        { label: 'Shared', value: 'shared' }
    ]);

    const [buttonTextValue, setButtonTextValue] = useState('S A V E');

    const [currentUser, setCurrentUser] = useState();

    let { item, buttonText } = props.route.params

    var isToUpdate = (buttonText === 'U P D A T E') ? true : false;

    var isShared = (typesValue === 'shared') ? true : false;

    useEffect(() => {
        let unsubscribed = false;

        getDocs(collectionGroup(db, "ContactList"))
            .then((querySnapshot) => {
                if (unsubscribed) return; // unsubscribed? do nothing.

                let contacts = querySnapshot.docs
                    .map((doc) => ({
                        // in order to select as multipe i need to have item and id keys
                        item: doc.data().name,
                        id: doc.id,
                        userId: doc.data().userId
                    }));

                setParticipantsItems(contacts);
                console.log(contacts);
            })
            .catch((err) => {
                if (unsubscribed) return;
                console.error("Failed to retrieve data", err);
            });


        return () => unsubscribed = true;
    }, []);


    // get logged user
    useEffect(() => {
        let unsubscribed = false;

        //db.collection("app").document("users").collection(uid).document("notifications")

        
        const check = async () => {
            const userRef = doc(db, "Users", userCtx.id)
            const docSnap = await getDoc(userRef);
            console.log(docSnap.data());

            setCurrentUser({
                userId: userCtx.id,
                name: docSnap.data().name
            })
        } 

        check();

        return () => unsubscribed = true;
    }, []);


    const saveItemHandler = async () => {
        if (buttonText == 'S A V E') {
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

    // by dumidu
    // send partcipants and total to CalculateExpenseScreen
    // const calculateAmountHandler = () => {

    //     if(enteredAmount > 0 && selectedParticipants.length > 0){
    //             props.navigation.navigate('Calculate', {
    //                 total: enteredAmount,
    //                 participants: selectedParticipants
    //             })
    //     }else{
    //         return
    //     }

    // }

    // pass this method as a prop to CalculateExpensScreen
    // const saveSharedExpenseParticipantHandler = () => {
    //     //pass the participantsExpenseList as a prop to createExpenseScreen


    // }


    const saveToDatabase = async () => {
        try {
            const expenseDocRef = await addDoc(collection(db, "Expenses"), {
                description: enteredDescription,
                amount: enteredAmount,
                date: serverTimestamp(),
                type: typesValue,
                participants: setupParticipants()
            });

            console.log("Document written with ID: ", expenseDocRef.id);
            return expenseDocRef.id;

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const updateDatabase = async () => {
        try {
            const expenseRef = doc(db, "Expenses", item.key);

            await updateDoc(expenseRef, {
                description: enteredDescription,
                amount: enteredAmount,
                participants: setupParticipants()
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
        if (buttonText == 'U P D A T E') {
            setDescription(item.value.description);
            setAmount(item.value.amount);
        }
    }, []);

    const successAlert = () => {
        Alert.alert(
            'SUCCESS',
            'Expense saved Successfully',
            [
                {
                    text: 'OK',
                    onPress: () => props.navigation.navigate('Home')
                },
            ],
            { cancelable: false },
        );
    }

    // send partcipants and total to CalculateExpenseScreen
    const calculateAmountHandler = () => {

        if (enteredAmount > 0 && selectedParticipants.length > 0) {
            props.navigation.navigate('Calculate', {
                onChangeParticipants: changeParticipantsHandler,
                total: enteredAmount,
                participants: setupParticipants()
            })
        } else {
            return
        }
    }

    const setupParticipants = () => {

        const loggedUser = {
            userId: currentUser.userId,
            name: currentUser.name,
            paid: true,
            share: 1/(selectedParticipants.length + 1)
        }

        const arr = selectedParticipants.map((participant) => ({
            userId: participant.userId,
            name: participant.item,
            status: 'open',
            paid: false,
            share: 1/(selectedParticipants.length + 1)
        }));

        arr.push(loggedUser)

        return arr;
    }

    const changeParticipantsHandler = (participants) => {
        setSelectedParticipants(participants);
    }

    return (
        <View style={styles.expInputContainer}>
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

                    <View>
                        <View style={{ height: 40 }} />
                        <Text style={{ fontSize: 20, paddingBottom: 10 }}>Participants</Text>
                        <SelectBox
                            label="Select Participants"
                            options={participantsItems}
                            selectedValues={selectedParticipants}
                            onMultiSelect={onMultiChange()}
                            onTapClose={onMultiChange()}
                            isMulti
                        />
                    </View>

                }
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
                
                {/* split options  */}
                <TouchableOpacity
                    onPress={calculateAmountHandler}
                    style={[styles.button]}>
                    <Text style={styles.buttonText}>Split options</Text>
                </TouchableOpacity>

            </View>
        </View>
    )

    function onMultiChange() {
        return (item) => setSelectedParticipants(xorBy(selectedParticipants, [item], 'id'))
    }

}

export default CreateExpense; 