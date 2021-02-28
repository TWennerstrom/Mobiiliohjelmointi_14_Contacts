import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {

const [contacts, setContacts] = useState([]);

const getContacts = async () => {
  const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers]
      });
      if (data.length > 0) {
        setContacts(data)
        console.log(contacts);
      }
    }
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 18}}>Contacts:</Text>
      <FlatList 
        style={{marginLeft : "5%"}}
        keyExtractor={item => item.id.toString()} 
        renderItem={({item}) => <View><Text style={{fontSize: 18}}>{item.name} - {item.phoneNumbers[0].number}</Text>
        </View>} 
        data={contacts} 
        ItemSeparatorComponent={listSeparator} 
      />
      <View>
      <Button title="Get contacts" onPress={getContacts}/>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
  },
});
