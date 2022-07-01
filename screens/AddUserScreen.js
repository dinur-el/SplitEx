import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { db } from '../firebaseConfig';
import { collection, addDoc } from "firebase/firestore"; 

const AddUserScreen = (props) => {

    const user = props.route.params.item

    const addUserHandler = () => {
        const docRef = addDoc(collection(db, "ContactList"), {
            name: user?.name,
            phone: user?.phoneNumbers[0]?.number
          });
    }

    console.log(user)

    return(
        <View style={styles.contactCon}>
            <View style={styles.imgCon}>
                <View style={styles.placeholder}>
                <Text style={styles.txt}>{user?.name}</Text>
                </View>
            </View>
            <View style={styles.contactDat}>
                <Text style={styles.name}>
                {user?.firstName}
                </Text>
                <Text style={styles.name}>
                {user?.lastName}
                </Text>
                <Text style={styles.phoneNumber}>
                {user?.phoneNumbers[0]?.number}
                </Text>
            </View>
            <Button 
                title="Add user"
                onPress={addUserHandler}
            />
        </View>
        
    );
}

const styles = StyleSheet.create({
    contactCon: {
      flex: 1,
      flexDirection: 'row',
      padding: 5,
      borderBottomWidth: 0.5,
      borderBottomColor: '#d9d9d9',
    },
    imgCon: {},
    placeholder: {
      width: 55,
      height: 55,
      borderRadius: 30,
      overflow: 'hidden',
      backgroundColor: '#d9d9d9',
      alignItems: 'center',
      justifyContent: 'center',
    },
    contactDat: {
      flex: 1,
      justifyContent: 'center',
      paddingLeft: 5,
    },
    txt: {
      fontSize: 18,
    },
    name: {
      fontSize: 16,
    },
    phoneNumber: {
      color: '#888',
    },
  });


export default AddUserScreen;