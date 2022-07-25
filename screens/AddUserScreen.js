import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { db } from '../firebaseConfig';
import { styles } from '../styles/styles';
import { collection, addDoc } from "firebase/firestore";

const AddUserScreen = (props) => {

  const user = props.route.params.item

  const addUserHandler = () => {
    const docRef = addDoc(collection(db, "ContactList"), {
      name: user?.name,
      phone: user?.phoneNumbers[0]?.number
    });
    props.navigation.navigate('Home')
  }

  //console.log(user)

  return (
    <View style={styles.container}>
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
      {/* <Button
        title="Add user"
        onPress={addUserHandler}
      /> */}
      <View style={styles.buttonContainer} >
        <TouchableOpacity
          onPress={addUserHandler}
          style={[styles.button,]}>
          <Text style={styles.buttonText}>ADD USER</Text>
        </TouchableOpacity>

      </View>
    </View>

  );
}



export default AddUserScreen;