import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AuthTemplate from '@/wrappers/AuthTemplate';
import SettingsRow from '@/components/Settings/SettingsRow';
import Sizes from '@/utils/Sizes';
import MasterAvatar from '@/components/Settings/MasterAvatar';
import { router } from 'expo-router';

const ProfileScreen = () => {
  const { user } = useSelector((state) => state.userSlice);
  const [userArray, setUserArray] = useState([]);

  const [editMode, setEditMode] = useState(false);

  const updateDetails = () => {
    setEditMode(!editMode);
    router.push('sub_views/account/UpdateDetails');
  };

  const getBrType = (idx) => {
    if (idx === 0) {
      return 'top-side';
    } else if (idx === userArray.length - 1) {
      return 'bottom-side';
    } else {
      return '';
    }
  };

  useEffect(() => {
    const userData = [];

    userData.push({
      name: user.userName?.trim(),
      subname: 'User Name',
      icon: 'user',
      iconFamily: 'Entypo',
    });

    userData.push({
      name: user.userEmail,
      subname: 'Email ID',
      icon: 'email',
      iconFamily: 'Entypo',
    });

    userData.push({
      name: user.userMobile,
      subname: 'User Mobile',
      icon: 'mobile',
      iconFamily: 'Entypo',
    });

    userData.push({
      name: user.userGender,
      subname: 'User Gender',
      icon: 'male-female',
      iconFamily: 'Ionicons',
    });

    userData.push({
      name: user.userDob,
      subname: 'Date of birth',
      icon: 'calendar-number',
      iconFamily: 'Ionicons',
    });

    setUserArray(userData);
  }, [user]);

  return (
    <AuthTemplate screenName='Edit Profile'>
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        contentContainerStyle={styles.profileContainer}
      >
        <MasterAvatar
          direction='column'
          uploadAble={true}
          textPosition='center'
        />
        <View style={styles.bottomContainer}>
          <View style={styles.titleAction}>
            <Text>Personal Info</Text>
            <TouchableOpacity onPress={updateDetails}>
              <Text>Update</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.settingsRows}>
            {userArray?.map((item, idx) => (
              <SettingsRow
                rowTitle={item.name}
                subTitle={item.subname}
                startIcon={item.icon}
                endIcon=''
                iconFamily={item.iconFamily}
                brType={getBrType(idx)}
                key={item.subname}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </AuthTemplate>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileContainer: {
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Sizes.$ieFlexGap,
    padding: Sizes.$ieRegularPadding,
    paddingBottom: 100,
  },
  bottomContainer: {
    borderRadius: Sizes.$ieLargeRadius,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  settingsRows: {
    gap: Sizes.$ieFlexGap,
  },
  titleAction: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: Sizes.$ieLargeMargin,
  },
});
