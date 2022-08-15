import React from "react";
import { View, Text, TouchableOpacity, Button } from 'react-native';

import { styles } from '../styles/styles';





const ExpenseListItem = props => {
    return (
        <View>
        <View style={styles.listItem}>
            <TouchableOpacity style={styles.rmvBtn} activeOpacity={0.8} onPress={props.onSelect.bind(this, props.id)}>
                <Text>DESCRIPTION: {props.item.description}</Text>
                <Text>AMOUNT: {props.item.amount}</Text>
            </TouchableOpacity>
            <Button 
                title="Settle up"
                onPress={() => (props.onSelect.bind(this, props.id))}
            />
        </View >
            <FlatList
            data={props.data}
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
        </View>
    )
}

export default ExpenseListItem;