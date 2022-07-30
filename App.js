import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SignupScreen from './screens/SignupScreen';
import CreateExpenseScreen from './screens/CreateExpenseScreen';
import ContactListScreen from './screens/ContactListScreen';
import AddUserScreen from './screens/AddUserScreen';
import UserContextProvider from './context/user-context';
import ParticipantContextProvider from './context/participants-context';
import CalculateExpenseScreen from './screens/CalculateExpenseScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Calculate"
              options={{
                title: 'Calculate Share',
              }}
            >
              {(props) => <CalculateExpenseScreen {...props} onChangeParticipants={props.route.params.onChangeParticipants} />}
            </Stack.Screen>
            <Stack.Screen
              name="CreateExpense"
              options={{
                title: 'Create Expense',
              }}
            >
              {(props) => <CreateExpenseScreen {...props} onSaveItem={props.route.params.onSaveItem} onUpdateItem={props.route.params.onUpdateItem} onDeleteItem={props.route.params.onDeleteItem} />}
            </Stack.Screen>
            <Stack.Screen name="ContactList" component={ContactListScreen} />
            <Stack.Screen name="AddUser" component={AddUserScreen} />
          </Stack.Navigator>
        </NavigationContainer>
    </UserContextProvider>
  );
}

