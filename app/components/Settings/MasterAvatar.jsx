import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import {
  CameraType,
  MediaTypeOptions,
  launchCameraAsync,
  launchImageLibraryAsync,
  requestCameraPermissionsAsync,
  requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo, Ionicons } from '@expo/vector-icons';
import UploadModal from '@/components/Modals/UploadModal';
import { trimmedText } from '@/utils/Globals';
import { updateImage, deleteImage, fetchImage } from '@/redux/slice/userData';
import placeHolder from '@/assets/images/profile.jpg';
import Sizes from '@/utils/Sizes';
import { useTheme } from '@/themes/ThemeProvider';

const MasterAvatar = (props) => {
  const {
    direction = 'column',
    onEditPress = () => {},
    uploadAble = false,
    textPosition = 'center',
  } = props;

  const dispatch = useDispatch();

  const { theme } = useTheme();

  const { user, imageUri, imageMessage } = useSelector(
    (state) => state.userSlice
  );

  const [imageSize, setImageSize] = useState(0);
  const [nameSize, setNameSize] = useState(0);
  const [emailSize, setEmailSize] = useState(0);
  const [padx, setPadx] = useState(0);
  const [pady, setPady] = useState(0);

  // Image upload states
  const [uploadModal, setUploadModal] = useState('close');
  const [afterUpload, setAfterUpload] = useState('initial');
  const [uploadStatus, setUploadStatus] = useState('');

  const [userContent, setUserContent] = useState({});

  const deleteUserImage = () => {
    const { userEmail, profileImage } = userContent;

    const usrData = {
      userEmail,
      profileImage,
    };

    setAfterUpload('done');

    if (userEmail && profileImage) {
      dispatch(deleteImage(usrData));
      setUploadStatus('Removed picture for user ' + userEmail);
    } else {
      setUploadStatus('Both email and picture must be valid!');
    }
  };

  const saveImage = async (image) => {
    const { userEmail, profileImage } = userContent;

    const usrData = {
      image,
      userEmail,
      profileImage,
    };
    if (userEmail) {
      dispatch(updateImage(usrData));
      setUploadStatus('Sucessfully uploaded!');
      setAfterUpload('done');
    } else {
      setAfterUpload('error');
      setUploadStatus('Unable to upload, try again!');
    }
  };

  const onCameraOpen = async () => {
    try {
      await requestCameraPermissionsAsync();
      const result = await launchCameraAsync({
        cameraType: CameraType.front,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        await saveImage(result.assets[0].uri);
      }
    } catch (error) {
      setAfterUpload('error');
      setUploadStatus('Unable to upload, try again!');
    }
  };

  const onGalleryOpen = async () => {
    try {
      await requestMediaLibraryPermissionsAsync();
      const result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        await saveImage(result.assets[0].uri);
      }
    } catch (error) {
      setAfterUpload('error');
      setUploadStatus('Unable to upload, try again!');
    }
  };

  const editHandler = () => {
    if (uploadAble) {
      setUploadModal('open');
    } else {
      onEditPress();
    }
  };

  const handleCancel = () => {
    setUploadModal('close');
    // using settimeout to avoid ui disturbances
    setTimeout(() => {
      setAfterUpload('initial');
      setUploadStatus('');
    }, 200);
  };

  useEffect(() => {
    if (direction === 'row') {
      setImageSize(Sizes.$ieRowAvatar);
      setNameSize(Sizes.$ieRegularFont);
      setEmailSize(Sizes.$ieMediumFont);
      setPadx(Sizes.$ieLargePadding);
      setPady(Sizes.$ieRegularPadding);
    } else {
      setImageSize(Sizes.$ieColumnAvatar);
      setNameSize(Sizes.$ieTitleFont);
      setEmailSize(Sizes.$ieLargeFont);
      setPadx(Sizes.$ieExtraPadding);
      setPady(Sizes.$ieLargePadding);
    }
  }, [direction]);

  useEffect(() => {
    if (user) {
      setUserContent(user);
      const imagePath = user?.profileImage;
      dispatch(fetchImage(imagePath));
    }
  }, [user]);

  const styles = StyleSheet.create({
    avatarContainer: {
      flexDirection: direction,
      borderRadius: Sizes.$ieLargeRadius,
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: padx,
      paddingVertical: pady,
      gap: Sizes.$ieFlexGapLarge,
    },
    imageBox: {
      width: imageSize,
      height: imageSize,
      position: 'relative',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    profileImage: {
      width: '100%',
      height: '100%',
      alignSelf: 'center',
      borderWidth: 5,
      borderColor: theme.white,
      borderRadius: 100,
      overflow: 'hidden',
    },
    updateImage: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      backgroundColor: theme.transwhite,
      padding: Sizes.$ieSmallPadding,
      borderRadius: Sizes.$ieRegularRadius,
      overflow: 'hidden',
    },
    userDetails: {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    nameText: {
      fontSize: nameSize,
      fontWeight: 'bold',
      color: theme.white,
      alignSelf: textPosition,
    },
    emailText: {
      fontSize: emailSize,
      color: theme.orange,
      alignSelf: textPosition,
    },
  });

  return (
    <LinearGradient
      colors={theme.profileGradients}
      style={styles.avatarContainer}
    >
      <View style={styles.imageBox}>
        <Image
          style={styles.profileImage}
          source={imageUri ? { uri: imageUri } : placeHolder}
        />
        <TouchableOpacity onPress={editHandler} style={styles.updateImage}>
          {direction === 'row' ? (
            <Entypo name='edit' size={20} color='black' />
          ) : (
            <Ionicons name='camera' size={20} color='black' />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.userDetails}>
        {userContent?.userName && (
          <Text style={styles.nameText}>
            {trimmedText(userContent?.userName, 15)}
          </Text>
        )}
        <Text style={styles.emailText}>
          {trimmedText(userContent?.userEmail, 20)}
        </Text>
      </View>
      {imageMessage && <Text>{imageMessage}</Text>}
      <UploadModal
        handleCamera={onCameraOpen}
        handleGallery={onGalleryOpen}
        handleRemove={deleteUserImage}
        modalStatus={uploadModal}
        afterAction={afterUpload}
        onClose={handleCancel}
        statusMessage={uploadStatus}
      />
    </LinearGradient>
  );
};

export default MasterAvatar;
