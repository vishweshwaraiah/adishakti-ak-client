import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addNumsGroups } from '@/redux/slice/numsGroups';
import MasterModal from '@/components/MasterModal';
import ContactsList from '@/components/Contacts/ContactsList';
import MasterInput from '@/components/MasterInput';
import MasterButton from '@/components/MasterButton';
import Colors from '@/utils/Colors';
import Sizes from '@/utils/Sizes';
import MasterError from '@/components/MasterError';

const AddGroup = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.numsGroups);

  const [contactNums, setContactNums] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [contactsError, setContactsError] = useState(false);

  const handleInput = (obj) => setGroupName(obj.value);

  const blurHandler = (name, error) => name && setNameError(error);

  const getContacts = (contacts) => {
    if (contacts?.length) {
      setContactsError(false);
      const numbers = contacts.map((x) => x.phoneNumbers[0].number);
      setContactNums(numbers);
    } else {
      setContactNums([]);
    }
  };

  const handleSubmit = () => {
    if (!groupName) {
      setNameError(true);
      return false;
    }
    console.log('contactNums', contactNums);
    if (!contactNums.length) {
      setContactsError(true);
      return false;
    }

    if (contactNums.length && groupName) {
      dispatch(
        addNumsGroups({
          groupName: groupName,
          numberList: contactNums,
        })
      );
      setContactNums([]);
      setModalOpen(false);
    }
  };

  useEffect(() => {
    if (!modalOpen) {
      setContactsError(false);
      setNameError(false);
    }
  }, [modalOpen]);

  const handleCancel = () => {
    setModalOpen(false);
  };

  return (
    <MasterModal
      triggerType='icon'
      triggerShape='circle'
      triggerSize='small'
      bodyHeight='60%'
      bgColor={Colors.$modalBodyBg}
      modalTitle='New Group'
      modalToggle={modalOpen}
      onToggle={setModalOpen}
    >
      <View style={styles.inputBox}>
        <MasterInput
          clearButtonMode='always'
          inputLabel='Enter gruop name'
          textColor='light'
          startIcon='group'
          iconFamily='FontAwesome'
          name='add_phone'
          type='text'
          rounded={true}
          width='95%'
          onInput={handleInput}
          onBlur={blurHandler}
          error={nameError}
        />
      </View>
      {contactsError && (
        <View style={{ marginTop: Sizes.$ieExtraMargin }}>
          <MasterError errorMsg='Select at least one contact!' />
        </View>
      )}
      <ContactsList fetchSelected={getContacts} toolsBar={false} />
      <View style={styles.groupActions}>
        <MasterButton
          onPress={handleCancel}
          title='Cancel'
          variant='light'
        ></MasterButton>
        <MasterButton
          onPress={handleSubmit}
          title='Save'
          variant='success'
        ></MasterButton>
      </View>
    </MasterModal>
  );
};

export default AddGroup;

const styles = StyleSheet.create({
  inputBox: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.$secondary,
  },
  groupActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: Sizes.$ieExtraMargin,
  },
  contactsList: {
    flex: 1,
  },
});
