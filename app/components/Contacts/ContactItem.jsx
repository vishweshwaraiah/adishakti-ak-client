import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Sizes from '@/utils/Sizes';
import { useTheme } from '@/themes/ThemeProvider';

const ContactItem = (props) => {
  const { contact, onPress } = props;

  const { theme } = useTheme();

  const [number, setNumber] = useState('');

  useEffect(() => {
    const num = contact?.phoneNumbers?.length;
    if (num > 0) setNumber(contact?.phoneNumbers[0]?.number);
  }, [contact]);

  const handlePress = () => {
    contact.selected = !contact.selected;
    onPress(contact);
  };

  const styles = StyleSheet.create({
    contactCon: {
      flex: 1,
      flexDirection: 'row',
      paddingVertical: Sizes.$ieRegularPadding,
      paddingHorizontal: Sizes.$ieExtraPadding,
      borderBottomWidth: 0.5,
      borderBottomColor: theme.black,
      marginBottom: 5,
    },
    imgCon: {
      overflow: 'hidden',
    },
    placeholder: {
      width: 55,
      height: 55,
      borderRadius: 30,
      overflow: 'hidden',
      backgroundColor: theme.light,
      alignItems: 'center',
      justifyContent: 'center',
    },
    contactDat: {
      flex: 1,
      justifyContent: 'center',
      paddingLeft: 5,
    },
    txt: {
      fontSize: 20,
    },
    name: {
      fontSize: 16,
    },
    phoneNumber: {
      color: theme.primary,
    },
    isSelected: {
      opacity: 0.9,
      borderRadius: Sizes.$ieRegularRadius,
    },
  });

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.contactCon}>
        <View style={styles.imgCon}>
          <View style={styles.placeholder}>
            {contact.selected ? (
              <Text style={styles.isSelected}>
                <FontAwesome name='check-circle' size={32} color='black' />
              </Text>
            ) : (
              <Text style={styles.txt}>{contact?.name[0]}</Text>
            )}
          </View>
        </View>
        <View style={styles.contactDat}>
          <Text style={styles.name}>{contact?.name}</Text>
          <Text style={styles.phoneNumber}>{number || 'No number!'}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ContactItem;
