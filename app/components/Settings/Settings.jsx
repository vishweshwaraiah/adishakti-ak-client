import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import SettingsRow from '@/components/Settings/SettingsRow';

const Settings = () => {
  return (
    <ScrollView contentContainerStyle={styles}>
      <SettingsRow
        rowTitle='Manage Groups'
        routePath='screens/account/GroupsScreen'
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
});
