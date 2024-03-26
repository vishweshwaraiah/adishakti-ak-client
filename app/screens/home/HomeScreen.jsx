import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AuthTemplate from '@/wrappers/AuthTemplate';
import ContactsList from '@/components/Contacts/ContactsList';
import Sizes from '@/utils/Sizes';
import MasterButton from '@/components/MasterButton';
import { router } from 'expo-router';

const HomeScreen = () => {
  const contactsScreen = () => router.navigate('screens/home/ContactsScreen');
  return (
    <AuthTemplate screenName='Home'>
      <View style={styles.titleContainer}>
        <Text style={styles.sectionTitle}>Home</Text>
      </View>
      <View style={styles.homeContent}>
        <MasterButton onPress={contactsScreen} title='Contacts' />
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
  homeContent: {
    height: '80%',
  },
});

export default HomeScreen;
