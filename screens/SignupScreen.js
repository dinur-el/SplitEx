import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './styles/styles';
import { auth } from '../firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import * as SQLite from 'expo-sqlite';

const SignupScreen = () => {

    // create db 'splitExDB'
    const db = SQLite.openDatabase(
        {
            name: 'splitExDB',
            location: 'default'
        }, () => { }, 
            error => {console.log(error)}
        );

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    useEffect(() => {
        createUserTable()
      }, 

      []
    );


    const handleSignUp = () => {

        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log(user.email);
                // save user email to db
                if(user.email){
                    saveSignedUserData(user.email)
                }
            })
            .catch(error => alert(error.message))
    }


    // create table -> usersTable
    // columns rowid (auto), user_email (Text)
    const createUserTable = () => {
        db.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS usersTable (id INTEGER PRIMARY KEY AUTOINCREMENT, user_email TEXT);', 
              [], 
              () => console.log('TABLE CREATED!'),
              (_, result) => console.log('TABLE CREATE failed:' + result)
            );
          });
    }

    const saveSignedUserData = (useremail) => {
        db.transaction(
            tx => {
              // executeSql(sqlStatement, arguments, success, error)
              tx.executeSql("INSERT INTO usersTable (user_email) values (?)", 
                [useremail],
                (_, { rowsAffected }) => rowsAffected > 0 ? console.log('ROW INSERTED!') : console.log('INSERT FAILED!'),
                (_, result) => console.log('INSERT failed:' + result)
              );
            }    
          );
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior='padding'
        >
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleSignUp}
                    style={styles.button}
                >
                    <Text style={styles.buttonTextOutline}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default SignupScreen