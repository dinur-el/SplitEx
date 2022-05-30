
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { auth } from '../firebaseConfig'
import { signOut } from 'firebase/auth'
import { useNavigation } from '@react-navigation/core'
import { styles } from './styles/styles';
import * as SQLite from 'expo-sqlite';


const HomeScreen = (props) => {

  const navigation = useNavigation()

  // create db 'splitExDB'
  const db = SQLite.openDatabase(
    {
        name: 'splitExDB',
        location: 'default'
    }, () => { }, 
        error => {console.log(error)}
    );

  const [users, setUsers] = useState([])

  const addUserHandler = (email, id) => {
      setUsers( userList => [...userList, { useremail:email, key:id }] )
  }

  // select users from data
  // to be done
  const selectSignedInUsers= () => {
    db.transaction(
      tx => {
        tx.executeSql("SELECT * FROM usersTable", 
          [], 
          (_, { rows }) => {     
            console.log("ROWS RETRIEVED!");
  
            let entries = rows._array;

            entries.forEach((entry) => {
                console.log('entries')
                console.log(entry)
                addUserHandler(entry.user_email, entry.id)
            });
          },
          (_, result) => {
            console.log('SELECT failed!');
            console.log(result);
          }
        )
      }
    );
  }  

  const handleSignOut = () => {
    signOut(auth).then(() => {
      props.navigation.navigate('Login')
    })
  }

  return (
      <View style={styles.container}>
        {/* <FlatList 
          data={users}
          renderItem={({ item }) => (<Text>{item.useremail}</Text>)}
        /> */}
        <TouchableOpacity
        style={styles.button}
        onPress={handleSignOut}
        >
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.button}
        onPress={selectSignedInUsers}
        >
          <Text style={styles.buttonText}>Check user list</Text>
        </TouchableOpacity>
      </View>
  )
}

export default HomeScreen