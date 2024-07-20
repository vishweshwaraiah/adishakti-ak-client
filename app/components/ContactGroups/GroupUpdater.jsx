import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ContactsList from '@/components/Contacts/ContactsList';
import MasterInput from '@/components/MasterInput';
import MasterButton from '@/components/MasterButton';
import MasterError from '@/components/MasterError';
import MasterIcon from '@/components/MasterIcon';
import { useTheme } from '@/themes/ThemeProvider';
import Sizes from '@/utils/Sizes';

const GroupUpdater = (props) => {
  const { onSubmit, lastGroupList, lastGroupName } = props;
  const { theme } = useTheme();

  const [contactNums, setContactNums] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [nameError, setNameError] = useState('');
  const [contactsError, setContactsError] = useState(false);
  const [selected, setSelected] = useState(0);
  const [total, setTotal] = useState(0);

  const handleSelect = (details) => {
    setSelected(details.selected);
    setTotal(details.total);
  };

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
      setContactNums(contacts);
    } else {
      setContactNums([]);
    }
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

    onSubmit(groupName, contactNums);
    setContactNums([]);
  };

  useEffect(() => {
    if (lastGroupName) setGroupName(lastGroupName);
  }, [lastGroupName]);

  const styles = StyleSheet.create({
    contactsList: {
      height: '95%',
    },
    inputBox: {
      alignItems: 'center',
      paddingTop: Sizes.$ieExtraPadding,
      paddingBottom: Sizes.$ieSmallPadding,
    },
    errorBox: {
      marginTop: Sizes.$ieLargeMargin,
    },
    groupActions: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end',
      gap: Sizes.$ieFlexGapLarge,
      marginTop: Sizes.$ieLargeMargin,
    },
    floatingBtn: {
      position: 'absolute',
      bottom: Sizes.$floatingBtn,
      right: Sizes.$ieActionBtn,
    },
  });

  return (
    <View style={styles.contactsList}>
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
          value={groupName}
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

      <ContactsList
        getSelectCount={handleSelect}
        fetchSelected={getContacts}
        toolsBar={false}
        lastGroupList={lastGroupList}
        actionType='update'
      />

      <View style={styles.groupActions}>
        <Text>
          {selected} of {total} Selected
        </Text>
        <MasterButton
          onPress={handleSubmit}
          userStyle={styles.floatingBtn}
          variant={theme.itemBg}
          shape='circle'
        >
          <MasterIcon
            iconFamily='Feather'
            iconName='save'
            iconColor={theme.itemColor}
          />
        </MasterButton>
      </View>
    </View>
  );
};

export default GroupUpdater;
