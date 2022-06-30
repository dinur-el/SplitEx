
import { Image, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { auth } from '../firebaseConfig'
import { signOut } from 'firebase/auth'
import { styles } from '../styles/styles';
import ExpenseListItem from '../components/ExpenseListItem';


const HomeScreen = (props) => {
  const [expenseList, setExpenseList] = useState([]);

  const updateExpenseHandler = (expenseId, description, amount) => {
      let index = expenseList.findIndex((key) => key !== expenseId);
      expenseList[index].value.description = description;
      expenseList[index].value.amount = amount;
      setExpenseList(expenseList => [...expenseList]);
  }

  const saveExpenseHandler = (description, amount) => {
      setExpenseList(expenseList => [...expenseList, { key: Math.random().toString(), value: { description: description, amount: amount } }]);
  }

  const handleSignOut = () => {
    signOut(auth).then(() => {
      props.navigation.navigate('Login')
    })
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.buttonOutline]}
        onPress={handleSignOut}
      >
        <Text style={styles.buttonTextOutline}>Sign out</Text>
      </TouchableOpacity>
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