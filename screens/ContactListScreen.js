import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import * as Contacts from "expo-contacts";
import ContactItem from "./ContactItem"


const ContactListScreen = () => {

    const [contacts, setContacts] = useState(undefined);

    useEffect(() => {
        (async () => {
          const { status } = await Contacts.requestPermissionsAsync();
          if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
              fields: [Contacts.PHONE_NUMBERS],
            });

            if (data.length > 0) {
              setContacts(data)
              //console.log(data)
            }
          }
        })();
      }, []);

    const keyExtractor = (item, idx) => {
    return item?.id?.toString() || idx.toString();
    };

    const renderItem = ({ item, index }) => {
      return <ContactItem contact={item} />;
    };

    return(
          <FlatList
            data={contacts}
            renderItem={
                renderItem
            }
            keyExtractor={keyExtractor}
            style={styles.list}
          />
    )

}

const styles = StyleSheet.create({
    list: {
      flex: 1,
    },
  });


export default ContactListScreen;