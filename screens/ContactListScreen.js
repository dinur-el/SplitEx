import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import * as Contacts from "expo-contacts";
import ContactItem from "../components/ContactItem"
//import { styles } from "../styles/styles";


const ContactListScreen = (props) => {

    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        (async () => {
          const { status } = await Contacts.requestPermissionsAsync();
          if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
              fields: [Contacts.PHONE_NUMBERS],
            });

            if (data.length > 0) {
              setContacts(data)
              setFilteredContacts(data)
            }
          }
        })();
      }, []);

    const keyExtractor = (item, idx) => {
    return item?.id?.toString() || idx.toString();
    };

    const renderItem = ({ item, index }) => {

      return (
        <TouchableOpacity 
        onPress={() => props.navigation.navigate('AddUser',{
        item: item
        })}>
            <ContactItem contact={item}/>
        </TouchableOpacity>
        );
    };

    const searchFilter = (text) => {
      if(text){
            const newData = contacts.filter((item) => {
            const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1
          });
          setFilteredContacts(newData);
          setSearch(text);
      }else{
        setFilteredContacts(contacts);
        setSearch(text);
      }
    } 

    return(
      <SafeAreaView>
        <View>
            <TextInput 
                  style={styles.textInput}
                  value={search}
                  placeholder='Search here'
                  onChangeText={ (text) => searchFilter(text) }
            />
          <FlatList
            data={filteredContacts}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
          </View>
      </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    list: {
      flex: 1,
    },
    textInput: {
      height: 40,
      borderWidth: 1,
      paddingLeft: 20,
      margin: 5
  }
  });


export default ContactListScreen;