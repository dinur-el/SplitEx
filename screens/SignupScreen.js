import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import { auth } from '../firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { db } from '../firebaseConfig';
import { collection, addDoc } from "firebase/firestore"; 

const SignupScreen = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');


    const handleSignUp = () => {

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredentials) => {
                const user = userCredentials.user;
                console.log(user.email);
                
                const docRef = await addDoc(collection(db, "Users"), {
                    name: name,
                    email: email,
                    phone: phone
                  });
                  console.log("Document written with ID: ", docRef.id);

                  props.navigation.navigate('Login')
            })
            .catch(error => alert(error.message))
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior='padding'
        >
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Fullname"
                    value={name}
                    onChangeText={(value) => setName(value)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Phone"
                    value={phone}
                    onChangeText={(value) => setPhone(value)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={(value) => setPassword(value)}
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