import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyBwfUY8PQltbBVkbE4i9rLODg4OBm-bdnU",
  authDomain: "splitex-dev.firebaseapp.com",
  projectId: "splitex-dev",
  storageBucket: "splitex-dev.appspot.com",
  messagingSenderId: "131845473610",
  appId: "1:131845473610:web:81607f1082407cf933edb3",
  measurementId: "G-DBHP349MMG"
};

const app = initializeApp(firebaseConfig);
const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


// test function
// function storeHighScore() {
//   const db = getDatabase();
//   const reference = ref(db, 'users/' + "Dumidu");
//   set(reference, {
//     highscore: 45,
//   });

//   console.log(db)
// }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
