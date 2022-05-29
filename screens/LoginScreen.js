import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import { authentication } from '../firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
//import { useNavigation } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/core'


const LoginScreen = () => {

  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    signInWithEmailAndPassword(authentication, email, password)
    .then( userCredentials => {
        const user = userCredentials.user
        console.log( `user ogged in with ${user.email}`)
    }).catch( error => alert(error.message))
  }

  useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged( user => {
      if(user){
        navigation.replace("Home")
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
          style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[ styles.button, styles.buttonOutline ]}>
            <Text style={ styles.buttonTextOutline }>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  inputContainer:{
    width: '80%',
  },

  input:{
    backgroundColor: 'white',
    paddingHorizontal: '20',
    paddingVertical: '10',
    borderRadius: '10',
    marginTop: '5'
  },

  buttonContainer:{
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '40'
  },

  button: {
    backgroundColor: '#782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },

  buttonOutline: {
    backgroundColor: 'white',
    borderColor: '#782F9',
    borderWidth: 2,
    marginTop: 10
  },

  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16
  },

  buttonTextOutline: {
    color: '#782F9',
    fontWeight: '700',
    fontSize: 16
  }

})