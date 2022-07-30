import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import ContactItem from "../components/ContactItem";
import { db } from '../firebaseConfig';
import { collection, getDocs } from "firebase/firestore";

const ContactListScreen = (props) => {

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    let unsubscribed = false;

    getDocs(collection(db, "Users"))
      .then((querySnapshot) => {
        if (unsubscribed) return; // unsubscribed? do nothing.
        const users = querySnapshot.docs
          .map((doc) => ({
            name: doc.data().name,
            phone: doc.data().phone,
            email: doc.data().email,
            id: doc.id,
          }));

        if (users.length > 0) {
          setUsers(users);
          setFilteredUsers(users)
        }
        
      })
      .catch((err) => {
        if (unsubscribed) return; // unsubscribed? do nothing.

        // TODO: Handle errors
        console.error("Failed to retrieve data", err);
      });

    return () => unsubscribed = true;
  }, []);

  const searchFilter = (text) => {
    if (text) {
      const newData = users.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1
      });
      setFilteredUsers(newData);
      setSearch(text);
    } else {
      setFilteredUsers(users);
      setSearch(text);
    }
  }

  return (
    <SafeAreaView>
      <View>
        <TextInput
          style={styles.textInput}
          value={search}
          placeholder='Search here'
          onChangeText={(text) => searchFilter(text)}
        />
        <FlatList
          data={filteredUsers}
          renderItem={
            (itemData) => (
              <TouchableOpacity
                onPress={() => props.navigation.navigate('AddUser', {
                  item: itemData.item
                })}>
                <ContactItem contact={itemData.item} />
              </TouchableOpacity>
            )
          }
        />
      </View>
    </SafeAreaView>
  )

}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5
  }
});


export default ContactListScreen;