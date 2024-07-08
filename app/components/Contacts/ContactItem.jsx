import React, { useEffect, useState, memo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import MasterIcon from '@/components/MasterIcon';
import Sizes from '@/utils/Sizes';
import { useTheme } from '@/themes/ThemeProvider';

const ContactItem = (props) => {
  const {
    contact,
    checked = false,
    onPress = () => {},
    noActions = false,
  } = props;

  const { theme } = useTheme();

  const [number, setNumber] = useState('');
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (contact?.phoneNumber) {
      const number = contact.phoneNumber;
      setNumber(number);
    }
    setIsSelected(contact?.selected);
  }, [contact, checked]);

  const handlePress = () => {
    if (!noActions) {
      contact.selected = !contact?.selected;
      setIsSelected(contact?.selected);
      onPress(contact);
    }
  };

  const styles = StyleSheet.create({
    contactContainer: {
      flex: 1,
      flexDirection: 'row',
      paddingVertical: Sizes.$ieRegularPadding,
      paddingHorizontal: Sizes.$ieRegularPadding,
      marginBottom: 5,
    },
    placeholder: {
      width: 55,
      height: 55,
      borderRadius: 30,
      overflow: 'hidden',
      backgroundColor: theme.itemBg,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    contactData: {
      flex: 1,
      justifyContent: 'center',
      paddingLeft: 5,
    },
    thumbTxt: {
      fontSize: 20,
      color: theme.itemColor,
    },
    contactName: {
      fontSize: 16,
      color: theme.itemColor,
    },
    phoneNumber: {
      color: theme.green,
    },
    isSelected: {
      opacity: 0.6,
      borderRadius: Sizes.$ieRegularRadius,
      borderBottomWidth: 0.5,
      borderBottomColor: theme.black,
    },
    isUnSelected: {
      backgroundColor: 'transparent',
      borderBottomWidth: 0.5,
      borderBottomColor: theme.black,
    },
  });

  return (
    <Pressable
      style={isSelected && !noActions ? styles.isSelected : styles.isUnSelected}
      onPress={handlePress}
    >
      <View style={styles.contactContainer}>
        <View style={styles.placeholder}>
          {isSelected && !noActions ? (
            <MasterIcon
              iconName='check-square'
              iconSize={32}
              iconColor={theme.itemColor}
              iconFamily='Feather'
            />
          ) : (
            <Text style={styles.thumbTxt}>{contact?.name?.[0]}</Text>
          )}
        </View>
        <View style={styles.contactData}>
          <Text style={styles.contactName}>{contact?.name || 'No Name'}</Text>
          <Text style={styles.phoneNumber}>{number || 'No number!'}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default memo(ContactItem);
