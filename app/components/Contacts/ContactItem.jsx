import Colors from '@/utils/Colors';
import Sizes from '@/utils/Sizes';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ContactItem = (props) => {
  const { contact, onPress } = props;
  const [number, setNumber] = useState('');

  useEffect(() => {
    const num = contact?.phoneNumbers?.length;
    if (num > 0) setNumber(contact?.phoneNumbers[0]?.number);
  }, [contact]);

  const handlePress = () => {
    contact.selected = !contact.selected;
    onPress(contact);
  };

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

const styles = StyleSheet.create({
  contactCon: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: Sizes.$iePadding,
    paddingHorizontal: Sizes.$ieExtraPadding,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.$black,
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
    backgroundColor: Colors.$white,
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
    color: Colors.$primary,
  },
  isSelected: {
    opacity: 0.9,
    borderRadius: Sizes.$ieBorderRadius,
  },
});

export default ContactItem;
