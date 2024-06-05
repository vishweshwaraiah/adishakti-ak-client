import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { addNumsGroups } from '@/redux/slice/numsGroups';
import MasterModal from '@/components/Modals/MasterModal';
import ContactsList from '@/components/Contacts/ContactsList';
import MasterInput from '@/components/MasterInput';
import MasterButton from '@/components/MasterButton';
import MasterIcon from '@/components/MasterIcon';
import MasterError from '@/components/MasterError';
import useMasterStyle from '@/utils/useMasterStyle';
import Sizes from '@/utils/Sizes';
import { useTheme } from '@/themes/ThemeProvider';

const AddGroup = () => {
  const dispatch = useDispatch();

  const { theme } = useTheme();
  const mStyles = useMasterStyle();

  const [contactNums, setContactNums] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [nameError, setNameError] = useState('');
  const [modalOpen, setModalOpen] = useState('close');
  const [contactsError, setContactsError] = useState(false);

  const handleInput = (obj) => {
    if (obj && obj.value) {
      const groupName = obj.value.trim();
      setGroupName(groupName);
    } else {
      setGroupName('');
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
      setNameError('Group name is required!');
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
      setNameError('');
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
      borderBottomColor: theme.secondary,
      alignItems: 'center',
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
      <TouchableOpacity onPress={openModal} style={mStyles.actionBtn}>
        <MasterIcon
          iconName='plus'
          iconSize={20}
          iconFamily='FontAwesome'
          iconColor={theme.itemColor}
        />
      </TouchableOpacity>
      <MasterModal
        bodyHeight={500}
        bgColor={theme.modalBodyBg}
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
            spacing={10}
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
