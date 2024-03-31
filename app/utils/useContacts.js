import { useState, useEffect } from 'react';
import * as Contacts from 'expo-contacts';

const useContacts = () => {
  const [allContacts, setAllContacts] = useState([]);
  const [allNumbers, setAllNumbers] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      if (data && data.length > 0) {
        setAllContacts(data);
      }
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  useEffect(() => {
    if (allContacts.length) {
      setAllNumbers(allContacts.map((i) => i?.phoneNumbers).filter((i) => i));
    }
  }, [allContacts]);

  return {
    allContacts,
    allNumbers,
  };
};

export default useContacts;
