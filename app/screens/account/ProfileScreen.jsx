import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import AuthTemplate from '@/wrappers/AuthTemplate';
import UpdateModal from '@/components/Modals/UpdateModal';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import Sizes from '@/utils/Sizes';
import Colors from '@/utils/Colors';
import { Entypo } from '@expo/vector-icons';

const ProfileScreen = () => {
  const { user } = useSelector((state) => state.userSlice);

  const [modalStatus, setModalStatus] = useState('close');
  const [statusMessage, setStatusMessage] = useState('');
  const [afterAction, setAfterAction] = useState(false);
  const [alertIcon, setAlertIcon] = useState('checkmark');

  const handleCancel = () => {
    setModalStatus('close');
  };

  const openModal = () => {
    setModalStatus('open');
  };

  const handleSubmit = () => {
    // on submit logic goes here
  };

  return (
    <AuthTemplate screenName='Edit Profile'>
      <ScrollView contentContainerStyle={styles.profileContainer}>
        <LinearGradient
          colors={Colors.$profileGradients}
          start={{ x: 0.7, y: 0.3 }}
          end={{ x: 0.3, y: 0.7 }}
          locations={[0.2, 0.5, 0.8]}
          style={styles.topContainer}
        >
          <View style={styles.imageBox}>
            <Image
              style={styles.profileImage}
              source={require('@/assets/images/logo.png')}
            />
          </View>
          <Text style={styles.nameText}>{user.name}</Text>
          <Text style={styles.emailText}>{user.email}</Text>
        </LinearGradient>
        <View style={styles.bottomContainer}>
          <UpdateModal
            onCancel={handleCancel}
            onSubmit={handleSubmit}
            modalStatus={modalStatus}
            statusMessage={statusMessage}
            afterAction={afterAction}
            onClose={handleCancel}
            alertIcon={alertIcon}
          />
          <TouchableOpacity onPress={openModal} style={styles.editableRow}>
            <Text style={{ color: 'white' }}>{user.mobile}</Text>
            <Entypo
              style={styles.editIcon}
              name='edit'
              size={24}
              color={'white'}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={openModal} style={styles.editableRow}>
            <Text style={{ color: 'white' }}>{user.email}</Text>
            <Entypo
              style={styles.editIcon}
              name='edit'
              size={24}
              color={'white'}
            />
          </TouchableOpacity>
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
  },
  topContainer: {
    borderRadius: Sizes.$ieLargeRadius,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 50,
  },
  bottomContainer: {
    width: '90%',
    borderRadius: Sizes.$ieLargeRadius,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.$white,
    padding: Sizes.$ieExtraPadding,
    marginTop: -50,
  },
  imageBox: {
    width: 200,
    height: 200,
    position: 'relative',
    alignSelf: 'center',
    padding: Sizes.$ieRegularPadding,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    borderWidth: 10,
    borderColor: Colors.$white,
    borderRadius: 100,
    overflow: 'hidden',
  },
  editableRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Sizes.$ieRegularMargin,
    padding: Sizes.$ieRegularPadding,
    backgroundColor: Colors.$secondary,
    borderRadius: Sizes.$ieRegularRadius,
  },
  editIcon: {
    padding: Sizes.$ieSmallPadding,
  },
  nameText: {
    fontSize: Sizes.$ieTitleFont,
    fontWeight: 'bold',
    color: Colors.$white,
    backgroundColor: 'transparent',
  },
  emailText: {
    fontSize: Sizes.$ieLargeFont,
    color: Colors.$orange,
  },
});
