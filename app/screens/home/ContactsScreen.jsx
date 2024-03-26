import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AuthTemplate from '@/wrappers/AuthTemplate';
import ContactsList from '@/components/Contacts/ContactsList';
import Sizes from '@/utils/Sizes';

const ContactsScreen = () => {
  return (
    <AuthTemplate screenName='Contacts'>
      <View style={styles.titleContainer}>
        <Text style={styles.sectionTitle}>Contacts</Text>
      </View>
      <View style={styles.contactsList}>
        <ContactsList />
      </View>
    </AuthTemplate>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: 32,
    paddingHorizontal: 20,
    paddingVertical: Sizes.$iePadding,
    fontWeight: 'bold',
  },
  contactsList: {
    height: '80%',
  },
});

export default ContactsScreen;
