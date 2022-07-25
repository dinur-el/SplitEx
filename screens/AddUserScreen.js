import React, { useContext } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { db } from '../firebaseConfig';
import { styles } from '../styles/styles';
import { collection, addDoc, doc } from "firebase/firestore";
import { UserContext } from '../store/user-context'

const AddUserScreen = (props) => {
  const userCtx = useContext(UserContext);
  const user = props.route.params.item

  const addUserHandler = async() => {
    await saveToDatabase();
    props.navigation.navigate('Home')
  }

  //console.log(user)
  const saveToDatabase = async () => {
    try {
      const userDocRef = doc(db, "Users", userCtx.id);
      const contactColRef = collection(userDocRef, "ContactList")
      const contactDocRef = await addDoc(contactColRef, {
        name: user?.name,
        phone: user?.phoneNumbers[0]?.number
      });

      console.log("Document written with ID: ", contactDocRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  console.log(user)

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