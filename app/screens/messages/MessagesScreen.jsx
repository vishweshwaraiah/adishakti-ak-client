import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { server_uri, validNumber } from '@/utils/Globals';
import AuthTemplate from '@/wrappers/AuthTemplate';
import MasterChats from '@/components/MasterChats';
import useContacts from '@/utils/useContacts';

const MessagesScreen = () => {
  const { numbers } = useContacts();
  const [numbersList, setNumbersList] = useState([]);

  const onPressSendMessage = (phonesArray, textMessage, sendType) => {
    let numbers = [];
    const message = textMessage;

    if (sendType === 'to_few') {
      numbers = phonesArray?.map((i) => i.value);
    } else {
      numbers = phonesArray;
    }

    const data = {
      numbers,
      message,
    };

    axios
      .post(server_uri + '/message', data)
      .then((response) => {
        if (response.data) {
          Alert.alert('Success!', 'Messages sent succssfully');
        }
      })
      .catch((err) => {
        Alert.alert('Failed to send!', err.message);
      });
  };

  useEffect(() => {
    numbers.forEach((i) => {
      let num = i[0].number;
      if (validNumber(num)) {
        setNumbersList((prevs) => {
          return [...prevs, num];
        });
      }
    });
  }, [numbers]);

  return (
    <AuthTemplate screenName='Messages'>
      <MasterChats onGetData={onPressSendMessage} numbersList={numbersList} />
    </AuthTemplate>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({});
