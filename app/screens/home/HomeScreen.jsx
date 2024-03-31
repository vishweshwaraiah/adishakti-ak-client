import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AuthTemplate from '@/wrappers/AuthTemplate';
import Sizes from '@/utils/Sizes';
import { router } from 'expo-router';

const HomeScreen = () => {
  const contactsScreen = () => router.navigate('screens/home/ContactsScreen');
  return (
    <AuthTemplate screenName='Home'>
      <View style={styles.titleContainer}>
        <Text style={styles.sectionTitle}>Home</Text>
      </View>
      <View style={styles.homeContent}>
        <Text style={styles.sectionTitle}>
          Welcome to the great Janagoud's world..!.
        </Text>
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
    paddingVertical: Sizes.$ieRegularPadding,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  homeContent: {
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
