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
import UpdateModal from '@/components/Modals/UpdateModal';
import SettingsRow from '@/components/Settings/SettingsRow';
import Sizes from '@/utils/Sizes';
import MasterAvatar from '@/components/Settings/MasterAvatar';

const ProfileScreen = () => {
  const { user } = useSelector((state) => state.userSlice);

  const [updateModal, setUpdateModal] = useState('close');
  const [statusMessage, setStatusMessage] = useState('');
  const [afterAction, setAfterAction] = useState('initial');
  const [alertIcon, setAlertIcon] = useState('thumbs-up');
  const [userArray, setUserArray] = useState([]);

  const openModal = () => {
    setStatusMessage('This feature is not fully enabled yet');
    setUpdateModal('open');
  };

  const handleCancel = () => {
    setUpdateModal('close');
  };

  const handleSubmit = () => {
    // on submit logic goes here
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
    if (user.name) {
      userData.push({
        name: user.name.trim(),
        subname: 'User Name',
        icon: 'user',
        iconFamily: 'Entypo',
      });
    }
    if (user.email) {
      userData.push({
        name: user.email,
        subname: 'Email ID',
        icon: 'email',
        iconFamily: 'Entypo',
      });
    }
    if (user.mobile) {
      userData.push({
        name: user.mobile,
        subname: 'User Mobile',
        icon: 'mobile',
        iconFamily: 'Entypo',
      });
    }
    if (user.gender) {
      userData.push({
        name: user.gender,
        subname: 'User Gender',
        icon: 'male-female',
        iconFamily: 'Ionicons',
      });
    }
    if (user.dob) {
      userData.push({
        name: user.dob,
        subname: 'Date of birth',
        icon: 'calendar-number',
        iconFamily: 'Ionicons',
      });
    }
    setUserArray(userData);
  }, [user]);

  return (
    <AuthTemplate screenName='Edit Profile'>
      <ScrollView contentContainerStyle={styles.profileContainer}>
        <MasterAvatar
          direction='column'
          uploadAble={true}
          textPosition='center'
        />
        <View style={styles.bottomContainer}>
          <View style={styles.titleAction}>
            <Text>Personal Info</Text>
            <TouchableOpacity onPress={openModal}>
              <Text>Edit</Text>
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
                key={item.name}
              />
            ))}
          </View>
        </View>
        <UpdateModal
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          modalStatus={updateModal}
          statusMessage={statusMessage}
          afterAction={afterAction}
          onClose={handleCancel}
          alertIcon={alertIcon}
          cancelText='Cancel'
          submitText='Okay'
        />
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
  },
  bottomContainer: {
    borderRadius: Sizes.$ieLargeRadius,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Sizes.$ieRegularPadding,
  },
  settingsRows: {
    gap: Sizes.$ieRegularMargin,
  },
  titleAction: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: Sizes.$ieLargeMargin,
  },
});
