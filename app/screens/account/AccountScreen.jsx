import React, { useEffect } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AuthTemplate from '@/wrappers/AuthTemplate';
import { MaterialIcons } from '@expo/vector-icons';
import MasterCard from '@/components/MasterCard';
import SettingsRow from '@/components/Settings/SettingsRow';
import { router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '@/redux/slice/userData';
import Colors from '@/utils/Colors';
import Sizes from '@/utils/Sizes';
import MasterAvatar from '@/components/Settings/MasterAvatar';

const AccountScreen = () => {
  const { user } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  const editProfile = () => {
    router.navigate('screens/account/ProfileScreen');
  };

  return (
    <AuthTemplate screenName='Account'>
      <View style={styles.profileBox}>
        <MasterAvatar
          userContent={user}
          onEditPress={editProfile}
          direction='row'
        />
      </View>
      <ScrollView contentContainerStyle={styles.settingsRows}>
        <SettingsRow
          rowTitle='Manage Groups'
          subTitle='View, add, update and delete groups'
          routePath='screens/account/GroupsScreen'
          startIcon='users'
          iconFamily='Entypo'
        ></SettingsRow>
        <SettingsRow
          rowTitle='View Contacts'
          subTitle='Browse, search and view contacts'
          routePath='screens/account/ContactsScreen'
          startIcon='contacts'
          iconFamily='AntDesign'
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
