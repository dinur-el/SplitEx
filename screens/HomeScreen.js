
import { Image, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import { auth } from '../firebaseConfig'
import { signOut } from 'firebase/auth'
import { styles } from '../styles/styles';
import ExpenseListItem from '../components/ExpenseListItem';
import { ActivityIndicator } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs } from "firebase/firestore";

const HomeScreen = (props) => {
  const [expenseList, setExpenseList] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading to true on component mount

  useEffect(() => {
    let unsubscribed = false;

  getDocs(collection(db, "Expenses"))
    .then((querySnapshot) => {
      if (unsubscribed) return; // unsubscribed? do nothing.
      
      const expenses = querySnapshot.docs
        .map((doc) => ({ 
          value:{...doc.data()},
          key: doc.id, 
        }));

        setExpenseList(expenses);
        setLoading(false);
    })
    .catch((err) => {
      if (unsubscribed) return; // unsubscribed? do nothing.

      // TODO: Handle errors
      console.error("Failed to retrieve data", err);
    });

  return () => unsubscribed  = true;
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  const updateExpenseHandler = (expenseId, description, amount) => {
    let index = expenseList.findIndex((key) => key !== expenseId);
    expenseList[index].value.description = description;
    expenseList[index].value.amount = amount;
    setExpenseList(expenseList => [...expenseList]);
  }

  const saveExpenseHandler = (key, description, amount) => {
    setExpenseList(expenseList => [...expenseList, { key: key, value: { description: description, amount: amount } }]);
  }

  const deleteExpenseHandler = (expenseId) => {
    let index = expenseList.findIndex((key) => key !== expenseId);
    expenseList.splice(index, 1);
    setExpenseList(expenseList => [...expenseList]);
}

  const handleContactList = () => {
    props.navigation.navigate('ContactList')
  }

  const handleSignOut = () => {
    signOut(auth).then(() => {
      props.navigation.navigate('Login')
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
      <TouchableOpacity
          style={styles.button}
          onPress={handleContactList}
        >
          <Text style={styles.buttonText}>Add contacts</Text>
        </TouchableOpacity>
      {/* <TouchableOpacity
        style={[styles.button, styles.buttonOutline]}
        onPress={handleSignOut}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity> */}
      </View>

      <FlatList
        data={expenseList}
        renderItem={
          (itemData) => (
            <ExpenseListItem
              id={itemData.item.key}
              onSelect={() => props.navigation.navigate('CreateExpense',
                {
                  onSaveItem: saveExpenseHandler,
                  onUpdateItem: updateExpenseHandler,
                  onDeleteItem: deleteExpenseHandler,
                  buttonText: "UPDATE",
                  item: itemData.item
                })}
              item={itemData.item.value}
            />
          )
        }
      />
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.addButton}
        onPress={() => props.navigation.navigate(
          'CreateExpense',
          {
            onSaveItem: saveExpenseHandler,
            onUpdateItem: updateExpenseHandler,
            onDeleteItem: deleteExpenseHandler,
            buttonText: "SAVE"
          })}
      >
        <Image
          source={require('../assets/plus-button-icon-27.jpg')}
          style={styles.floatingButtonStyle}
        />
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen