import React, { useEffect, useState, useCallback } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ContactItem from '@/components/Contacts/ContactItem';
import MasterInput from '@/components/MasterInput';
import useContacts from '@/utils/useContacts';
import MasterCheckbox from '@/components/MasterCheckbox';
import Sizes from '@/utils/Sizes';
import { useTheme } from '@/themes/ThemeProvider';
import MasterIcon from '@/components/MasterIcon';

const ContactsList = (props) => {
  const {
    toolsBar = true,
    bgColor = 'transparent',
    fetchSelected = () => {},
    onSelectText = () => {},
  } = props;

  const { theme } = useTheme();

  const [keyword, setKeyword] = useState('');
  const [order, setOrder] = useState('Asc');
  const [keyError, setKeyError] = useState(false);
  const [selectedArray, setSelectedArray] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [isIntermediate, setIsIntermediate] = useState(false);

  const { allContacts } = useContacts();

  const blurHandler = (name, error) => name && setKeyError(error);

  const handleInput = (obj) => setKeyword(obj.value);

  const toggleOrder = () => {
    const newOrder = order === 'Asc' ? 'Desc' : 'Asc';
    setOrder(newOrder);
  };

  const contactListFiltered = allContacts.filter((contact) => {
    const { name } = contact;
    return name?.toLowerCase().includes(keyword.toLowerCase());
  });

  const contactsSorted = contactListFiltered.sort((a, b) => {
    if (order === 'Asc') {
      return a.name.localeCompare(b.name);
    }
    return b.name.localeCompare(a.name);
  });

  const onCheck = useCallback(
    (contact) => {
      let previous = [...selectedArray];
      if (!previous.find((x) => x.id === contact.id)) {
        previous.push(contact);
      } else {
        previous = previous?.filter((x) => x.id !== contact.id);
      }
      setSelectedArray(previous);
    },
    [selectedArray]
  );

  useEffect(() => {
    let previous = [...allContacts];
    if (allSelected) {
      setSelectedArray(
        previous.map((i) => {
          i.selected = true;
          return i;
        })
      );
    } else {
      previous = previous.map((i) => {
        i.selected = false;
        return i;
      });
      setSelectedArray([]);
    }
  }, [allSelected, setAllSelected]);

  useEffect(() => {
    fetchSelected(selectedArray);
  }, [selectedArray]);

  useEffect(() => {
    if (selectedArray.length && selectedArray.length < allContacts.length) {
      setIsIntermediate(true);
    } else {
      setIsIntermediate(false);
    }
    onSelectText({
      selected: selectedArray.length,
      total: contactsSorted.length,
    });
  }, [allContacts, selectedArray]);

  const keyExtractor = (i, idx) => {
    return i?.id?.toString() || idx.toString();
  };

  const renderItem = (i) => {
    const { item } = i;
    if (item !== undefined) {
      return <ContactItem contact={item} onPress={onCheck} />;
    }
  };

  const contactsListHeader = () => {
    return (
      <View style={styles.contactsPage}>
        <MasterInput
          inputLabel='Search contacts'
          textColor='light'
          onInput={handleInput}
          onBlur={blurHandler}
          startIcon='search'
          iconFamily='FontAwesome'
          name='searchkey'
          value={keyword}
          error={keyError}
          rounded={true}
          inputWidth='95%'
        />

        {toolsBar && (
          <View style={[styles.sortButton, styles.mbRegular]}>
            <MasterCheckbox
              onPress={() => setAllSelected(!allSelected)}
              isChecked={allSelected}
              size='large'
              color='dark'
              isIntermediate={isIntermediate}
            />
            <TouchableOpacity onPress={toggleOrder}>
              <MasterIcon
                iconName={order === 'Asc' ? 'sort-alpha-down' : 'sort-alpha-up'}
                iconSize={24}
                iconColor={theme.itemBg}
                iconFamily='FontAwesome5'
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const styles = StyleSheet.create({
    contactsList: {
      flex: 1,
      backgroundColor: bgColor,
    },
    sortButton: {
      backgroundColor: theme.gray,
      padding: Sizes.$ieRegularPadding,
      borderRadius: Sizes.$ieRegularRadius,
      borderBottomColor: theme.activeBar,
      borderBottomWidth: 2,
      marginHorizontal: Sizes.$ieRegularMargin,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      width: '95%',
      marginTop: Sizes.$ieRegularMargin,
    },
    mbRegular: {
      marginBottom: Sizes.$ieRegularMargin,
    },
    contactsPage: {
      borderBottomWidth: 1,
      paddingBottom: Sizes.$ieRegularPadding,
      paddingHorizontal: Sizes.$ieRegularPadding,
      marginTop: Sizes.$ieRegularMargin,
      alignItems: 'center',
    },
    contactsView: {
      flex: 1,
    },
    noContactsText: {
      paddingHorizontal: Sizes.$ieRegularPadding,
      paddingVertical: Sizes.$ieLargePadding,
      fontSize: Sizes.$ieLargeFont,
      textAlign: 'center',
      fontWeight: '600',
    },
  });

  return (
    <View style={styles.contactsView}>
      {contactsSorted?.length ? (
        <FlatList
          data={contactsSorted}
          ListHeaderComponent={contactsListHeader()}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          style={styles.contactsList}
          removeClippedSubviews={true}
        />
      ) : (
        <Text style={styles.noContactsText}>
          Looks like there are no contacts in your device!
        </Text>
      )}
    </View>
  );
};

export default ContactsList;
