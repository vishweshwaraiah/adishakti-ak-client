import { useState, useEffect } from 'react';
import * as Contacts from 'expo-contacts';
import { OptimizeContacts } from '@/utils/Globals';

const useContacts = () => {
  const [allContacts, setAllContacts] = useState([]);
  const [allNumbers, setAllNumbers] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [
          Contacts.Fields.PhoneNumbers,
          Contacts.Fields.Image,
          Contacts.Fields.Name,
          Contacts.Fields.FirstName,
        ],
      });
      if (data && data.length > 0) {
        const filteredList = data.filter(
          (x) => x.name && x.phoneNumbers?.length
        );
        const Optimized = OptimizeContacts(filteredList);
        setAllContacts(Optimized);
      }
    } else {
      return 'Access to contacts is denied!';
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  useEffect(() => {
    if (allContacts.length) {
      const getNumbers = allContacts
        .map((i) => i?.phoneNumber)
        .filter((i) => i);
      setAllNumbers(getNumbers);
    }
  }, [allContacts]);

  return {
    allContacts,
    allNumbers,
  };
};

export default useContacts;
