import {Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import { auth } from '../firebaseConfig'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { useNavigation } from '@react-navigation/core'
import { styles } from './styles/styles';


const LoginScreen = (props) => {

  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then( userCredentials => {
        const user = userCredentials.user
        console.log( `user logged in with ${user.email}`)
    }).catch( error => alert(error.message))
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if(user){
        console.log("inside if")
        props.navigation.navigate('Home')
      }
      else{
        console.log("inside else")
        props.navigation.navigate('Login')
      }
    })

    return unsubscribe

  }, [])


  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior="padding">
      <Text>LoginScreen</Text>
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder='email'
          value={email}
          onChangeText={ text => setEmail(text) }
          style={styles.input}
        />
        <TextInput 
          placeholder='password'
          value={password}
          onChangeText={ text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          onPress={handleLogin}
          style={[styles.button, styles.buttonOutline]}>
            <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={[ styles.button, styles.buttonOutline ]}
            onPress={() => props.navigation.replace('Signup')}
        >
            <Text style={ styles.buttonTextOutline }>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen