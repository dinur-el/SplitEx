import {Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { auth } from '../firebaseConfig'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { useNavigation } from '@react-navigation/core'
import { styles } from '../styles/styles';
import { UserContext } from '../store/user-context'


const LoginScreen = (props) => {
  const userCtx = useContext(UserContext);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then( userCredentials => {
        const user = userCredentials.user
        console.log( `user logged in with ${user}`)
    }).catch( error => alert(error.message))
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if(user){
        console.log( `user logged in with ${user.uid}`)
        userCtx.setUser(user.uid)
        props.navigation.navigate('Home')
      }
      else{
        props.navigation.navigate('Login')
      }
    })

    return unsubscribe

  }, [])


  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior="padding"
  >
    <Image 
    source={require('../assets/my-icon2.jpeg')}
    style={styles.iconStyle}
    />

      <View style={styles.inputContainer}>
        <TextInput 
          placeholder='User ID'
          value={email}
          onChangeText={ text => setEmail(text) }
          style={styles.input}
        />
        <TextInput 
          placeholder='Password'
          value={password}
          onChangeText={ text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          onPress={handleLogin}
          style={[styles.button, ]}>
            <Text style={ styles.buttonText}>L O G I N</Text>
        </TouchableOpacity>
 
        <TouchableOpacity 
            style={[ styles.button,  ]}
            onPress={() => props.navigation.replace('Signup')}
        >
            <Text style={ styles.buttonText}>R E G I S T E R</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen