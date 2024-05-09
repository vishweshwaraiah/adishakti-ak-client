import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import AuthTemplate from '@/wrappers/AuthTemplate';
import SettingsRow from '@/components/Settings/SettingsRow';
import { router } from 'expo-router';
import Colors from '@/utils/Colors';
import Sizes from '@/utils/Sizes';
import MasterAvatar from '@/components/Settings/MasterAvatar';

const AccountScreen = () => {
  const editProfile = () => {
    router.navigate('sub_views/account/ProfileScreen');
  };

  return (
    <AuthTemplate screenName='Account'>
      <View style={styles.profileBox}>
        <MasterAvatar
          onEditPress={editProfile}
          direction='row'
          textPosition='flex-start'
        />
      </View>
      <ScrollView contentContainerStyle={styles.settingsRows}>
        <SettingsRow
          rowTitle='Manage Groups'
          subTitle='View, add, update and delete groups'
          routePath='sub_views/account/GroupsScreen'
          startIcon='users'
          iconFamily='Entypo'
          brType='all-side'
        ></SettingsRow>
        <SettingsRow
          rowTitle='View Contacts'
          subTitle='Browse, search and view contacts'
          routePath='sub_views/account/ContactsScreen'
          startIcon='contacts'
          iconFamily='AntDesign'
          brType='all-side'
        ></SettingsRow>
        <SettingsRow
          rowTitle='App Settings'
          subTitle='Change the application behaviours'
          routePath='sub_views/settings/AppSettings'
          startIcon='settings'
          iconFamily='Feather'
          brType='all-side'
        ></SettingsRow>
      </ScrollView>
    </AuthTemplate>
  );
};

const styles = StyleSheet.create({
  profileBox: {
    padding: Sizes.$ieRegularPadding,
  },
  editBtn: {
    position: 'absolute',
    right: 0,
    opacity: 0.8,
    backgroundColor: Colors.$primary,
    paddingHorizontal: Sizes.$ieExtraPadding,
    paddingVertical: Sizes.$ieRegularPadding,
    borderRadius: Sizes.$ieLargeRadius,
  },
  settingsRows: {
    justifyContent: 'center',
    width: '95%',
    alignItems: 'center',
    alignSelf: 'center',
    gap: Sizes.$ieRegularMargin,
  },
});

export default AccountScreen;
