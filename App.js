import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SignupScreen from './screens/SignupScreen';
import CreateExpenseScreen from './screens/CreateExpenseScreen';
import ContactListScreen from './screens/ContactListScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login" 
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} /> 
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="CreateExpense"
          options={{
            title: 'Create Expense',
          }}
        >
          {(props) => <CreateExpenseScreen {...props} onSaveItem={props.route.params.onSaveItem} />}
        </Stack.Screen>
        <Stack.Screen name="ContactList" component={ContactListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

