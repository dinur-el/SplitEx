
import { Image, Text, View, TouchableOpacity, FlatList, Alert, Platform } from 'react-native'
import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { auth } from '../firebaseConfig'
import { signOut } from 'firebase/auth'
import { styles } from '../styles/styles';
import ExpenseListItem from '../components/ExpenseListItem';
import { ActivityIndicator } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { UserContext } from '../store/user-context';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true
    };
  }
});

const HomeScreen = (props) => {
  const userCtx = useContext(UserContext);
  const [expenseList, setExpenseList] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  

  const updatePushToken = async (pushToken) => {
    try {
      const userRef = doc(db, "Users", userCtx.id);

      await updateDoc(userRef, {
        pushToken: pushToken,
      });

      console.log("Push Token updated");
    } catch (e) {
      console.error("Error push Token: ", e);
    }
  }

  useEffect(() => {
    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (finalStatus != 'granted') {
        Alert.alert(
          'Permission required',
          'Push notifications need the appropriate permissions.'
        );
        return;
      }

      const pushTokenData = await Notifications.getExpoPushTokenAsync();
      console.log("push Token", pushTokenData);
      await updatePushToken(pushTokenData.data);

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.DEFAULT
        });
      }
    }

    configurePushNotifications();

  }, []);

  useEffect(() => {
    let unsubscribed = false;

    getDocs(collection(db, "Expenses"))
      .then((querySnapshot) => {
        if (unsubscribed) return; // unsubscribed? do nothing.

        const expenses = querySnapshot.docs
          .map((doc) => ({
            value: { ...doc.data() },
            key: doc.id,
          }));

        setExpenseList(expenses);
        setLoading(false);
      })
      .catch((err) => {
        if (unsubscribed) return; // unsubscribed? do nothing.

        // TODO: Handle errors
        console.error("Failed to retrieve data", err);
      });

    return () => unsubscribed = true;
  }, []);

  useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log('NOTIFICATION RECIEVED');
        console.log(notification);
        const userName = notification.request.content.data.userName;
        console.log(userName);
      }
    );

    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log('NOTIFICATION RESPONSE RECIEVED');
        console.log(response);
        const userName = response.notification.request.content.data.userName;
        console.log(userName);
      }
    );

    return () => {
      subscription1.remove();
      subscription2.remove();
    }
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  const updateExpenseHandler = (expenseId, description, amount) => {
    let index = expenseList.findIndex((key) => key !== expenseId);
    expenseList[index].value.description = description;
    expenseList[index].value.amount = amount;
    setExpenseList(expenseList => [...expenseList]);
  }

  const saveExpenseHandler = (key, description, amount) => {
    setExpenseList(expenseList => [...expenseList, { key: key, value: { description: description, amount: amount } }]);
  }

  const deleteExpenseHandler = (expenseId) => {
    let index = expenseList.findIndex((key) => key !== expenseId);
    expenseList.splice(index, 1);
    setExpenseList(expenseList => [...expenseList]);
  }

  const handleContactList = () => {
    props.navigation.navigate('ContactList')
  }

  const handleSignOut = () => {
    signOut(auth).then(() => {
      props.navigation.navigate('Login')
    })
  }

  function scheduleNotificationHandler() {
    Notifications.scheduleNotificationAsync({
      ccontent: {
        title: 'My first local notification',
        body: "This is the body of the Notification",
        data: { username: 'Max' },
      },
      trigger: {
        seconds: 5,
      }
    });
  }

  const sendPushNotificationHandler = () => {
    try {
      fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          'host': 'exp.host',
          'accept': 'application/json',
          'accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: 'ExponentPushToken[FkY8O0CQvXqjYMnfV6bFi2]',
          title: 'Test - sent from a device!',
          body: 'This is a test!'
        })
      });
    } catch (error) {
      console.log(error);
    }
  }

  

  return (
    <View style={styles.homeContainer}>
      <View style={styles.addContactsBtn}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.addButton}
          onPress={handleContactList}
        >
          <Image
            source={require('../assets/add-contact.jpeg')}
            style={styles.floatingButtonStyle}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.createExpenseBtn}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate(
            'CreateExpense',
            {
              onSaveItem: saveExpenseHandler,
              onUpdateItem: updateExpenseHandler,
              onDeleteItem: deleteExpenseHandler,
              buttonText: "S A V E"
            })}

        >
          <Text style={styles.buttonText}>CREATE NEW EXPENSE</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={expenseList}
        renderItem={
          (itemData) => (
            <ExpenseListItem
              id={itemData.item.key}
              onSelect={() => props.navigation.navigate('CreateExpense',
                {
                  onSaveItem: saveExpenseHandler,
                  onUpdateItem: updateExpenseHandler,
                  onDeleteItem: deleteExpenseHandler,
                  buttonText: "U P D A T E",
                  item: itemData.item
                })}
              item={itemData.item.value}
            />
          )
        }
      />
    </View>
  )
}

export default HomeScreen