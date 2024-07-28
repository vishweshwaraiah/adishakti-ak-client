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
    router.push('screens/account/UpdateScreen');
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

    const newDate = new Date(user?.userDob);
    const strDate = newDate.toDateString();

    userData.push({
      name: strDate,
      subname: 'Date of birth',
      icon: 'calendar-number',
      iconFamily: 'Ionicons',
    });

    setUserArray(userData);
  }, [user]);

  const styles = StyleSheet.create({
    avatarBox: {
      padding: Sizes.$ieRegularPadding,
    },
    profileContainer: {
      flexFlow: 'row wrap',
      justifyContent: 'center',
      alignItems: 'center',
      gap: Sizes.$ieFlexGap,
      padding: Sizes.$ieRegularPadding,
    },
    bottomContainer: {
      borderRadius: Sizes.$ieLargeRadius,
      justifyContent: 'center',
      alignItems: 'center',
      width: '95%',
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

  return (
    <AuthTemplate screenName='Edit Profile'>
      <MasterAvatar
        direction='column'
        uploadAble={true}
        textPosition='center'
        avatarStyles={styles.avatarBox}
      />
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        contentContainerStyle={styles.profileContainer}
      >
        <View style={styles.bottomContainer}>
          <View style={styles.titleAction}>
            <Text>Personal Info</Text>
            <TouchableOpacity onPress={updateDetails}>
              <Text>Update</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.settingsRows}>
            {userArray?.map((item) => (
              <SettingsRow
                rowTitle={item.name}
                subTitle={item.subname}
                startIcon={item.icon}
                endIcon=''
                iconFamily={item.iconFamily}
                brType='all-side'
                key={item.subname}
                titleFirst={false}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </AuthTemplate>
  );
};

export default ProfileScreen;
