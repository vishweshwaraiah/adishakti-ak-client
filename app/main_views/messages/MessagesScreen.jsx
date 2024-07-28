import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ValidNumber } from '@/utils/Globals';
import { sendMessages } from '@/redux/slice/numsGroups';
import useContacts from '@/utils/useContacts';
import AuthTemplate from '@/wrappers/AuthTemplate';
import MasterChats from '@/components/MasterChats';
import AlertModal from '@/components/Modals/AlertModal';
import MasterLoader from '@/components/MasterLoader';

const MessagesScreen = () => {
  const { allNumbers } = useContacts();
  const { status, message } = useSelector((state) => state.groupsSlice);

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
  };

  useEffect(() => {
    if (status === 'sms_sent') {
      setModalStatus('open');
      setStatusMessage(message);
      setAfterAction('done');
      setAlertIcon('alert-circle');
    }

    if (status === 'sms_sending') {
      setModalStatus('open');
      setStatusMessage(message);
      setAfterAction('error');
      setAlertIcon('information');
    }

    if (status === 'sms_error') {
      setModalStatus('open');
      setStatusMessage(message);
      setAfterAction('error');
      setAlertIcon('warning');
    }
  }, [status, message]);

  useEffect(() => {
    allNumbers.forEach((number) => {
      if (ValidNumber(number)) {
        setNumbersList((prevs) => [...prevs, number]);
      }
    });

    return () => setNumbersList([]);
  }, [allNumbers]);

  return (
    <AuthTemplate screenName='Messages'>
      {numbersList.length ? (
        <MasterChats
          onSendClick={handleContent}
          numbersList={numbersList}
          selectOptions={selectOptions}
          resetAction={clearForm}
        />
      ) : (
        <MasterLoader loaderMessage='Loading contacts list!' />
      )}
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
