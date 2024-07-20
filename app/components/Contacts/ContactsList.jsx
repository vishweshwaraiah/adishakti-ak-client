import React, { useMemo, useState, useCallback, useEffect } from 'react';
import {
  SectionList,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ContactItem from '@/components/Contacts/ContactItem';
import MasterCheckbox from '@/components/MasterCheckbox';
import MasterIcon from '@/components/MasterIcon';
import MasterSearch from '@/components/MasterSearch';
import useContacts from '@/utils/useContacts';
import { useTheme } from '@/themes/ThemeProvider';
import Sizes from '@/utils/Sizes';
import useMasterStyle from '@/utils/useMasterStyle';

const ContactsList = (props) => {
  const {
    toolsBar = true,
    getSelectCount = () => {},
    fetchSelected = () => {},
    lastGroupList = [],
    bgColor = 'transparent',
  } = props;

  const { allContacts } = useContacts();
  const { theme } = useTheme();
  const mStyles = useMasterStyle();

  const [sortBy, setSortBy] = useState('asc');
  const [keyword, setKeyword] = useState('');
  const [selectedArray, setSelectedArray] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [isIntermediate, setIsIntermediate] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [ogContacts, setOgContacts] = useState([]);

  const sortFn = (a, b, key) => {
    if (sortBy === 'asc') {
      return a[key].localeCompare(b[key]);
    } else {
      return b[key].localeCompare(a[key]);
    }
  };

  const getSections = () => {
    if (ogContacts.length) {
      const sectionsMap = ogContacts.reduce((acc, item) => {
        const [firstName] = item?.name?.split(' ');
        let [letter] = firstName;

        if (!letter) {
          letter = '#';
        }

        return Object.assign(acc, {
          [letter]: [...(acc[letter] || []), item],
        });
      }, {});

      const sectionsList = Object.entries(sectionsMap)
        .map(([letter, items]) => ({
          title: letter,
          data: items.sort((a, b) => sortFn(a, b, 'name')),
        }))
        .sort((a, b) => sortFn(a, b, 'title'));

      return sectionsList;
    }
  };

  const contactSections = useMemo(
    () => getSections(),
    [ogContacts, sortBy, selectedArray]
  );

  const handleInput = (value) => {
    setKeyword(value);
    const formattedQuery = value?.toLowerCase();

    const filteredData = contactSections?.map((section) => {
      const { data } = section;
      const filteredItems = data.filter((item) => {
        return item.name?.toLowerCase().includes(formattedQuery);
      });

      return { ...section, data: filteredItems };
    });

    setFilteredData(filteredData);
  };

  const toggleAllSelect = () => {
    setAllSelected(!allSelected);
  };

  useEffect(() => {
    if (allSelected) {
      setSelectedArray(ogContacts);
    } else {
      setSelectedArray([]);
    }
  }, [allSelected, setAllSelected]);

  const toggleOrder = () => {
    setSortBy((prev) => (prev === 'desc' ? 'asc' : 'desc'));
  };

  useEffect(() => {
    if (allContacts.length) {
      const mappedList = allContacts.map((contact) => {
        const isSelected = selectedArray.some((x) => x.id === contact.id);
        contact.selected = isSelected;
        return contact;
      });
      setOgContacts(mappedList);
      fetchSelected(selectedArray);
    }

    getSelectCount({
      selected: selectedArray.length,
      total: allContacts.length,
    });

    if (selectedArray.length && selectedArray.length < allContacts.length) {
      setIsIntermediate(true);
    } else {
      setIsIntermediate(false);
    }
  }, [allContacts, selectedArray]);

  useEffect(() => {
    if (lastGroupList.length) {
      setSelectedArray(lastGroupList);
    }
  }, [lastGroupList]);

  const onContactClick = useCallback(
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

  const keyExtractor = (i, idx) => {
    return i?.id?.toString() || idx.toString();
  };

  const styles = StyleSheet.create({
    contactsView: {
      flex: 1,
      width: '100%',
      borderBottomWidth: 1,
      paddingBottom: Sizes.$ieRegularPadding,
      paddingHorizontal: Sizes.$ieRegularPadding,
      alignItems: 'center',
      maxHeight: '100%',
    },
    sectionHeader: {
      fontSize: Sizes.$ieTitleFont,
      backgroundColor: theme.itemColor,
      color: theme.itemBg,
      width: '10%',
      paddingVertical: Sizes.$ieRegularPadding,
      marginTop: Sizes.$ieSmallMargin,
      borderRadius: Sizes.$ieRegularRadius,
      overflow: 'hidden',
      position: 'absolute',
      right: 10,
      textAlign: 'center',
      ...mStyles.topShadow,
    },
    contactsList: {
      flex: 1,
      backgroundColor: bgColor,
      width: '100%',
    },
    sortButton: {
      backgroundColor: theme.itemBg,
      padding: Sizes.$ieRegularPadding,
      borderRadius: Sizes.$ieRegularRadius,
      overflow: 'hidden',
      borderBottomColor: theme.activeBar,
      borderBottomWidth: 5,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      width: '95%',
      margin: Sizes.$ieRegularMargin,
    },
    sortText: {
      color: theme.itemColor,
    },
    noContactsText: {
      paddingHorizontal: Sizes.$ieRegularPadding,
      paddingVertical: Sizes.$ieLargePadding,
      fontSize: Sizes.$ieLargeFont,
      textAlign: 'center',
      fontWeight: '600',
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '94%',
      marginVertical: Sizes.$ieSmallMargin,
    },
    sectionTitle: {
      fontSize: Sizes.$ieTitleFont,
      paddingVertical: Sizes.$ieRegularPadding,
      fontWeight: 'bold',
      color: theme.titleColor,
    },
  });

  const RenderItem = ({ item }) => {
    if (item?.phoneNumber) {
      return (
        <ContactItem
          contact={item}
          checked={item.selected}
          onPress={onContactClick}
        />
      );
    }
  };

  const ContactsHeader = () => {
    return (
      <View style={styles.sortButton}>
        <MasterCheckbox
          onPress={toggleAllSelect}
          isChecked={allSelected}
          size='large'
          iconColor={theme.itemColor}
          isIntermediate={isIntermediate}
        />
        <Text style={styles.sortText}>
          Total: {ogContacts?.length} | {selectedArray.length} Selected
        </Text>
        <TouchableOpacity onPress={toggleOrder}>
          <MasterIcon
            iconName={sortBy === 'asc' ? 'sort-alpha-down' : 'sort-alpha-up'}
            iconSize={24}
            iconColor={theme.itemColor}
            iconFamily='FontAwesome5'
          />
        </TouchableOpacity>
      </View>
    );
  };

  const SectionHeader = (sectsObj) => {
    const {
      section: { title, data },
    } = sectsObj;
    return !!data.length && <Text style={styles.sectionHeader}>{title}</Text>;
  };

  return (
    <View style={styles.contactsView}>
      <View style={styles.titleContainer}>
        <Text style={styles.sectionTitle}>Contacts</Text>
        <MasterSearch
          onInput={handleInput}
          iconFamily='FontAwesome'
          value={keyword}
          autofocus={false}
          placeholder='Search contacts!'
        />
      </View>
      {toolsBar && !keyword && <ContactsHeader />}
      {contactSections?.length ? (
        <SectionList
          sections={keyword ? filteredData : contactSections}
          keyExtractor={keyExtractor}
          renderItem={RenderItem}
          style={styles.contactsList}
          renderSectionHeader={SectionHeader}
          stickySectionHeadersEnabled
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
