import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addNumsGroups } from '@/redux/slice/numsGroups';
import MasterModal from '@/components/Modals/MasterModal';
import ContactsList from '@/components/Contacts/ContactsList';
import MasterInput from '@/components/MasterInput';
import MasterButton from '@/components/MasterButton';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/utils/Colors';
import Sizes from '@/utils/Sizes';
import MasterError from '@/components/MasterError';
import MasterStyles from '@/utils/MasterStyles';

const AddGroup = () => {
  const dispatch = useDispatch();

  const [contactNums, setContactNums] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [modalOpen, setModalOpen] = useState('close');
  const [contactsError, setContactsError] = useState(false);

  const handleInput = (obj) => {
    if (obj && obj.value) {
      const groupName = obj.value.trim();
      setGroupName(groupName);
    }
  };

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

  const onClose = () => {
    setModalOpen('close');
  };

  const handleSubmit = () => {
    if (!groupName) {
      setNameError(true);
      return false;
    }

    if (!contactNums.length) {
      setContactsError(true);
      return false;
    }

    if (contactNums.length && groupName) {
      const groupData = {
        groupName: groupName,
        numberList: contactNums,
      };

      dispatch(addNumsGroups(groupData));
      setContactNums([]);
      setModalOpen('close');
    }
  };

  useEffect(() => {
    if (modalOpen === 'close') {
      setContactsError(false);
      setNameError(false);
    }
  }, [modalOpen]);

  const handleCancel = () => {
    setModalOpen('close');
  };

  const openModal = () => {
    setModalOpen('open');
  };

  const styles = StyleSheet.create({
    inputBox: {
      borderBottomWidth: 1,
      borderBottomColor: Colors.$secondary,
    },
    groupActions: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 20,
      marginTop: Sizes.$ieLargeMargin,
    },
    contactsList: {
      flex: 1,
    },
    errorBox: {
      marginTop: Sizes.$ieLargeMargin,
    },
  });

  return (
    <View>
      <TouchableOpacity onPress={openModal} style={MasterStyles.actionBtn}>
        <FontAwesome name='plus' size={20} color={Colors.$black} />
      </TouchableOpacity>
      <MasterModal
        bodyHeight={500}
        bgColor={Colors.$modalBodyBg}
        modalTitle='New Group'
        status={modalOpen}
        setStatus={setModalOpen}
        onClose={onClose}
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
            width='90%'
            onInput={handleInput}
            onBlur={blurHandler}
            error={nameError}
          />
        </View>
        {contactsError && (
          <View style={styles.errorBox}>
            <MasterError
              errorMsg='Select at least one contact!'
              width='90%'
              timeout={0}
            />
          </View>
        )}
        <ContactsList fetchSelected={getContacts} toolsBar={false} />
        <View style={styles.groupActions}>
          <MasterButton
            onPress={handleCancel}
            title='Cancel'
            variant='light'
            textColor='black'
          ></MasterButton>
          <MasterButton
            onPress={handleSubmit}
            title='Save'
            variant='success'
          ></MasterButton>
        </View>
      </MasterModal>
    </View>
  );
};

export default AddGroup;
