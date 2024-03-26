import { useState, useEffect } from 'react';
import * as Contacts from 'expo-contacts';

const useContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [numbers, setNumbers] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      if (data && data.length > 0) {
        setContacts(data);
      }
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  useEffect(() => {
    if (contacts.length) {
      setNumbers(contacts.map((i) => i?.phoneNumbers).filter((i) => i));
    }
  }, [contacts]);

  return {
    contacts,
    numbers,
  };
};

export default useContacts;
