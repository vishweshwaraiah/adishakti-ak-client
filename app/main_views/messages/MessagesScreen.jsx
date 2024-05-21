import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ValidNumber } from '@/utils/Globals';
import AuthTemplate from '@/wrappers/AuthTemplate';
import MasterChats from '@/components/MasterChats';
import AlertModal from '@/components/Modals/AlertModal';
import useContacts from '@/utils/useContacts';
import { sendMessages } from '@/redux/slice/numsGroups';
import { useDispatch } from 'react-redux';

const MessagesScreen = () => {
  const { allNumbers } = useContacts();

  const dispatch = useDispatch();

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
    { label: 'Select numbers or groups', value: 'default', selected: true },
    { label: 'Send to few numbers', value: 'to_few', selected: false },
    { label: 'Send to contacts group', value: 'to_group', selected: false },
    { label: 'Send to all contacts', value: 'to_all', selected: false },
  ];

  const handleContent = (smsContent) => {
    const { phonesArray = [], textMessage = '', sendType = '' } = smsContent;

    setModalStatus('open');

    if (phonesArray.length && textMessage && sendType) {
      setStatusMessage('Do you really want to send message?');
      setAfterAction('initial');
      setAlertIcon('help-circle');
      setSelectedNumbers(phonesArray);
      setMessageContent(textMessage);
      setSelectType(sendType);
    } else {
      setStatusMessage('Message and numbers are required!');
      setAfterAction('error');
      setAlertIcon('alert-circle');
      setSelectedNumbers([]);
      setMessageContent('');
      setSelectType('');
    }
  };

  const handleCancel = () => {
    setModalStatus('close');
    setSelectedNumbers([]);
    setMessageContent('');
    setSelectType('');
  };

  const handleSubmit = () => {
    setClearForm({});

    if (selectType === 'default' || selectType === '') return false;

    const data = {
      numbers: selectedNumbers,
      message: messageContent,
    };

    dispatch(sendMessages(data));

    // if (response.data) {
    //   setModalStatus('open');
    //   setStatusMessage('Successfully sent!');
    //   setAfterAction('done');
    //   setAlertIcon('alert-circle');
    // } else {
    //   setModalStatus('open');
    //   setStatusMessage(err.message);
    //   setAfterAction('error');
    //   setAlertIcon('alert-circle');
    // }
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
