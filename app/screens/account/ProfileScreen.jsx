import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AuthTemplate from '@/wrappers/AuthTemplate';
import UpdateModal from '@/components/Modals/UpdateModal';
import SettingsRow from '@/components/Settings/SettingsRow';
import Sizes from '@/utils/Sizes';
import MasterAvatar from '@/components/Settings/MasterAvatar';
import UploadModal from '@/components/Modals/UploadModal';

const ProfileScreen = () => {
  const { user } = useSelector((state) => state.userSlice);

  const [updateModal, setUpdateModal] = useState('close');
  const [uploadModal, setUploadModal] = useState('close');
  const [statusMessage, setStatusMessage] = useState('');
  const [afterAction, setAfterAction] = useState(false);
  const [alertIcon, setAlertIcon] = useState('checkmark');

  const openModal = () => {
    setUpdateModal('open');
  };

  const handleCancel = () => {
    setUpdateModal('close');
  };

  const openUploadModal = () => {
    setUploadModal('open');
  };

  const handleUploadCancel = () => {
    setUploadModal('close');
  };

  const handleSubmit = () => {
    // on submit logic goes here
  };

  const handleCameraUpload = () => {
    // on submit logic goes here
  };

  const handleGalleryUpload = () => {};

  const handleRemoveUpload = () => {};

  return (
    <AuthTemplate screenName='Edit Profile'>
      <ScrollView contentContainerStyle={styles.profileContainer}>
        <MasterAvatar
          userContent={user}
          onEditPress={openUploadModal}
          direction='column'
        />
        <View style={styles.bottomContainer}>
          <View style={styles.settingsRows}>
            <SettingsRow
              rowTitle={user.mobile}
              subTitle='Update mobile number'
              onRowPress={openModal}
              startIcon='mobile'
              endIcon='edit'
              iconFamily='Entypo'
            />
            <SettingsRow
              rowTitle={user.email}
              subTitle='Update email id'
              onRowPress={openModal}
              startIcon='email'
              endIcon='edit'
              iconFamily='Entypo'
            />
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
        />
        <UploadModal
          handleCamera={handleCameraUpload}
          handleGallery={handleGalleryUpload}
          handleRemove={handleRemoveUpload}
          modalStatus={uploadModal}
          afterAction={afterAction}
          onClose={handleUploadCancel}
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
    paddingHorizontal: Sizes.$ieExtraPadding,
  },
  settingsRows: {
    gap: Sizes.$ieRegularMargin,
  },
});
