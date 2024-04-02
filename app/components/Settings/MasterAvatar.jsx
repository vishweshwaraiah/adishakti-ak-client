import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo, Ionicons } from '@expo/vector-icons';
import Colors from '@/utils/Colors';
import Sizes from '@/utils/Sizes';
import { trimmedText } from '@/utils/Globals';

const MasterAvatar = (props) => {
  const { userContent, direction = 'column', onEditPress = () => {} } = props;

  const [imageSize, setImageSize] = useState(0);
  const [nameSize, setNameSize] = useState(0);
  const [emailSize, setEmailSize] = useState(0);
  const [padx, setPadx] = useState(0);
  const [pady, setPady] = useState(0);

  const editHandler = () => {
    onEditPress();
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

  const styles = StyleSheet.create({
    avatarContainer: {
      flexDirection: direction,
      borderRadius: Sizes.$ieLargeRadius,
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: padx,
      paddingVertical: pady,
      gap: Sizes.$ieFlexGap,
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
      borderColor: Colors.$white,
      borderRadius: 100,
      overflow: 'hidden',
    },
    updateImage: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      backgroundColor: Colors.$transwhite,
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
      color: Colors.$white,
      backgroundColor: 'transparent',
      textAlign: 'center',
    },
    emailText: {
      fontSize: emailSize,
      color: Colors.$orange,
      textAlign: 'center',
    },
  });

  return (
    <LinearGradient
      colors={Colors.$profileGradients}
      start={{ x: 0.7, y: 0.3 }}
      end={{ x: 0.3, y: 0.7 }}
      locations={[0.2, 0.5, 0.8]}
      style={styles.avatarContainer}
    >
      <View style={styles.imageBox}>
        <Image
          style={styles.profileImage}
          source={require('@/assets/images/couple.jpg')}
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
        <Text style={styles.nameText}>{userContent.name}</Text>
        <Text style={styles.emailText}>
          {trimmedText(userContent?.email, 20)}
        </Text>
      </View>
    </LinearGradient>
  );
};

export default MasterAvatar;
