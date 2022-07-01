import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const AddUserScreen = (props) => {

    console.log(props.route.params.item.phoneNumbers[0].number)

    return(
        <View>
            <Text>Add user screen</Text>
            <Button 
                title="Add user"
            />
        </View>
    )
}

export default AddUserScreen;