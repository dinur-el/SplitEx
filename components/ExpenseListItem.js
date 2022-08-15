import React from "react";
import { View, Text, TouchableOpacity, BUtton } from 'react-native';
import { Button } from "react-native-web";
import { styles } from '../styles/styles';

const ExpenseListItem = props => {
    return (
        <View style={styles.listItem}>
            <TouchableOpacity style={styles.rmvBtn} activeOpacity={0.8} onPress={props.onSelect.bind(this, props.id)}>
                <Text>DESCRIPTION: {props.item.description}</Text>
                <Text>AMOUNT: {props.item.amount}</Text>
            </TouchableOpacity>
            <Button 
                title="SETTLE IT"
                onPress={props.onDelete.bind(this, props.id)}
            />
        </View >
    )
}

export default ExpenseListItem;