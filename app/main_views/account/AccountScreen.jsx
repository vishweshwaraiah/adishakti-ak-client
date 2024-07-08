import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import AuthTemplate from '@/wrappers/AuthTemplate';
import SettingsRow from '@/components/Settings/SettingsRow';
import { router } from 'expo-router';
import MasterAvatar from '@/components/Settings/MasterAvatar';
import Sizes from '@/utils/Sizes';

const AccountScreen = () => {
  const editProfile = () => {
    router.navigate('screens/account/ProfileScreen');
  };

  const styles = StyleSheet.create({
    avatarBox: {
      padding: Sizes.$ieRegularPadding,
    },
    settingsRows: {
      justifyContent: 'center',
      width: '95%',
      alignItems: 'center',
      alignSelf: 'center',
      gap: Sizes.$ieRegularMargin,
    },
  });

  return (
    <AuthTemplate screenName='Account'>
      <MasterAvatar
        onEditPress={editProfile}
        direction='row'
        textPosition='flex-start'
        avatarStyles={styles.avatarBox}
      />
      <ScrollView contentContainerStyle={styles.settingsRows}>
        <SettingsRow
          rowTitle='Manage Groups'
          subTitle='View, add, update and delete groups'
          routePath='screens/groups/ListScreen'
          startIcon='users'
          iconFamily='Entypo'
          brType='all-side'
        ></SettingsRow>
        <SettingsRow
          rowTitle='View Contacts'
          subTitle='Browse, search and view contacts'
          routePath='screens/account/ContactsScreen'
          startIcon='contacts'
          iconFamily='AntDesign'
          brType='all-side'
        ></SettingsRow>
        <SettingsRow
          rowTitle='App Settings'
          subTitle='Change the application behaviours'
          routePath='screens/settings/ConfigsScreen'
          startIcon='settings'
          iconFamily='Feather'
          brType='all-side'
        ></SettingsRow>
      </ScrollView>
    </AuthTemplate>
  );
};

export default AccountScreen;
