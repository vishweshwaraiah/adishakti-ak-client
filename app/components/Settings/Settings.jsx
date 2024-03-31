import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import SettingsRow from '@/components/Settings/SettingsRow';
import Sizes from '@/utils/Sizes';

const Settings = () => {
  return (
    <ScrollView contentContainerStyle={styles}>
      <SettingsRow
        rowTitle='Manage Groups'
        routePath='screens/account/GroupsScreen'
      ></SettingsRow>
      <SettingsRow
        rowTitle='View Contacts'
        routePath='screens/account/ContactsScreen'
      ></SettingsRow>
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  justifyContent: 'center',
  width: '95%',
  alignItems: 'center',
  alignSelf: 'center',
  gap: Sizes.$ieRegularMargin,
});
