import React from "react";
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from '../styles/styles';

const ExpenseListItem = props => {
    return (
        <View style={styles.listItem}>
            <TouchableOpacity style={styles.rmvBtn} activeOpacity={0.8} onPress={props.onSelect.bind(this, props.id)}>
                <Text>DESCRIPTION: {props.item.description}</Text>
                <Text>AMOUNT: {props.item.amount}</Text>
            </TouchableOpacity>
        </View >
    )
}

export default ExpenseListItem;