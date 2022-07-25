
import { Image, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { auth } from '../firebaseConfig'
import { signOut } from 'firebase/auth'
import { styles } from '../styles/styles';
import ExpenseListItem from '../components/ExpenseListItem';
import { ActivityIndicator } from 'react-native';
import { db } from '../firebaseConfig';
import { collectionGroup, getDocs } from "firebase/firestore";
import { UserContext } from '../store/user-context'

const HomeScreen = (props) => {
  const userCtx = useContext(UserContext);
  const [expenseList, setExpenseList] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading to true on component mount

  useEffect(() => {
    let unsubscribed = false;
    console.log("id in context.....",userCtx.id)
    getDocs(collectionGroup(db, "Expenses"))
      .then((querySnapshot) => {
        if (unsubscribed) return; // unsubscribed? do nothing.

        const expenses = querySnapshot.docs
          .map((doc) => ({
            value: { ...doc.data() },
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

    return () => unsubscribed = true;
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
    <View style={styles.homeContainer}>
       <View style={styles.addContactsBtn}> 
          <TouchableOpacity
        activeOpacity={0.7}
        style={styles.addButton}
        onPress={handleContactList}
      >
        <Image
          source={require('../assets/add-contact.jpeg')}
          style={styles.floatingButtonStyle}
        />
      </TouchableOpacity>
      </View> 
      
      <View style={styles.createExpenseBtn}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate(
            'CreateExpense',
            {
              onSaveItem: saveExpenseHandler,
              onUpdateItem: updateExpenseHandler,
              onDeleteItem: deleteExpenseHandler,
              buttonText: "S A V E"
            })}

        >
          <Text style={styles.buttonText}>CREATE NEW EXPENSE</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.expInputContainer}> */}
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
                  buttonText: "U P D A T E",
                  item: itemData.item
                })}
              item={itemData.item.value}
            />
          )
        }
      />
      {/* </View> */}
      {/* <TouchableOpacity
        activeOpacity={0.7}
        style={styles.addButton}
        onPress={() => props.navigation.navigate(
          'CreateExpense',
          {
            onSaveItem: saveExpenseHandler,
            onUpdateItem: updateExpenseHandler,
            buttonText: "S A V E"
          })}
      >
        <Image
          source={require('../assets/add-expense.png')}
          style={styles.floatingButtonStyle}
        />
      </TouchableOpacity> */}
    </View>
  )
}

export default HomeScreen