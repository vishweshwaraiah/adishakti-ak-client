import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { ServerUri, ValidNumber } from '@/utils/Globals';
import AuthTemplate from '@/wrappers/AuthTemplate';
import MasterChats from '@/components/MasterChats';
import AlertModal from '@/components/Modals/AlertModal';
import useContacts from '@/utils/useContacts';

const MessagesScreen = () => {
  const { allNumbers } = useContacts();
  const [numbersList, setNumbersList] = useState([]);
  const [modalStatus, setModalStatus] = useState('close');
  const [statusMessage, setStatusMessage] = useState('');
  const [afterAction, setAfterAction] = useState('initial');
  const [alertIcon, setAlertIcon] = useState('checkmark');

  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const [selectType, setSelectType] = useState('');

  const [clearForm, setClearForm] = useState('');

  const selectOptions = [
    { label: 'Send to few numbers', value: 'to_few' },
    { label: 'Send to contacts group', value: 'to_group' },
    { label: 'Send to all contacts', value: 'to_all' },
  ];

  const handleContent = (smsContent) => {
    const { phonesArray = [], textMessage = '', sendType = '' } = smsContent;

    setModalStatus('open');

    if (phonesArray.length && textMessage && sendType) {
      setStatusMessage('Do you really want to send message?');
      setAfterAction('initial');
      setAlertIcon('help-circle');
      setSelectedNumbers(phonesArray);
      setMessageContent();
      setSelectType();
    } else {
      setStatusMessage('Message and numbers are required!');
      setAfterAction('error');
      setAlertIcon('alert-circle');
      setSelectedNumbers([]);
      setMessageContent(textMessage);
      setSelectType(sendType);
    }
  };

  const handleCancel = () => {
    setModalStatus('close');
  };

  const handleSubmit = () => {
    let numbersList = [];

    setClearForm({});
    // if (sendType === 'to_few') {
    //   numbersList = phonesArray?.map((i) => i.value);
    // } else {
    //   numbersList = phonesArray;
    // }
    // const data = {
    //   numbers: numbersList,
    //   message: textMessage,
    // };
    // axios
    //   .post(ServerUri + '/message', data)
    //   .then((response) => {
    //     if (response.data) {
    //       setModalStatus('open');
    //       setStatusMessage('Successfully sent!');
    //       setAfterAction('done');
    //       setAlertIcon('alert-circle');
    //     }
    //   })
    //   .catch((err) => {
    //     setModalStatus('open');
    //     setStatusMessage(err.message);
    //     setAfterAction('error');
    //     setAlertIcon('alert-circle');
    //   });
  };

  useEffect(() => {
    allNumbers.forEach((i) => {
      let num = i[0].number;
      if (ValidNumber(num)) {
        setNumbersList((prevs) => {
          return [...prevs, num];
        });
      }
    });
  }, [allNumbers]);

  return (
    <AuthTemplate screenName='Messages'>
      <MasterChats
        onSendClick={handleContent}
        numbersList={numbersList}
        selectOptions={selectOptions}
        resetAction={clearForm}
      />
      <AlertModal
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        modalStatus={modalStatus}
        statusMessage={statusMessage}
        afterAction={afterAction}
        onClose={handleCancel}
        alertIcon={alertIcon}
        iconFamily='Ionicons'
      />
    </AuthTemplate>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({});
