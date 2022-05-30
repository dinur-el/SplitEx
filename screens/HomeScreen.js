
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { auth } from '../firebaseConfig'
import { signOut } from 'firebase/auth'
import { useNavigation } from '@react-navigation/core'
import { styles } from './styles/styles';


const HomeScreen = () => {

  const navigation = useNavigation()

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigation.replace("Login")
    })
  }

  return (
      <View style={styles.container}>
        <Text>Email: {auth.currentUser?.email}</Text>
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