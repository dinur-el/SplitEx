
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { authentication } from '../firebaseConfig'
import { signOut } from 'firebase/auth'
import { useNavigation } from '@react-navigation/core'


const HomeScreen = () => {

  const navigation = useNavigation()

  const handleSignOut = () => {
    signOut(authentication).then(() => {
      navigation.replace("Login")
    })
  }

  return (
      <View style={styles.container}>
        <Text>Email: {authentication.currentUser?.email}</Text>
        <TouchableOpacity
        style={styles.button}
        onPress={handleSignOut}
        >
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </View>
  )
}

export default HomeScreen

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