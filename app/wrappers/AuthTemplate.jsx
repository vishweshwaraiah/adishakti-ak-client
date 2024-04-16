import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  ImageBackground,
  View,
  Pressable,
} from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { clearUser } from '@/redux/slice/userData';
import { logoutUser } from '@/redux/slice/authData';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import AlertModal from '@/components/Modals/AlertModal';
import MasterStyles from '@/utils/MasterStyles';
import Colors from '@/utils/Colors';

const screenWidth = Dimensions.get('window').width;

const AuthTemplate = (props) => {
  const { children, screenName = '', rightHeader = null } = props;
  const dispatch = useDispatch();

  const router = useRouter();
  const navigation = useNavigation();

  const [lastScreen, setLastScreen] = useState(false);
  const [modalStatus, setModalStatus] = useState('close');

  const statusMessage = 'Are you sure to logout?';

  const logoutCurrentUser = () => {
    setModalStatus('close');
    setTimeout(() => {
      dispatch(logoutUser());
      dispatch(clearUser());
      router.replace('/auth/login');
    }, 1000);
  };

  const handleCancel = () => {
    setModalStatus('close');
  };

  const pressLogout = () => {
    setModalStatus('open');
  };

  const goBack = () => {
    if (router.canGoBack()) {
      setLastScreen(false);
      router.back();
    } else {
      setLastScreen(true);
    }
  };

  const goHome = () => {
    router.replace('/');
  };

  const leftHeaderNode = () => (
    <View style={styles.headerView}>
      {lastScreen ? (
        <Pressable
          style={({ pressed }) => [
            MasterStyles.actionBtn,
            pressed && styles.pressedBtn,
          ]}
          onPress={goHome}
          variant='trans'
        >
          <Ionicons name='home' size={20} color='black' />
        </Pressable>
      ) : (
        <Pressable
          style={({ pressed }) => [
            MasterStyles.actionBtn,
            pressed && styles.pressedBtn,
          ]}
          onPress={goBack}
          variant='trans'
        >
          <FontAwesome name='chevron-left' size={20} color='black' />
        </Pressable>
      )}
    </View>
  );

  const rightHeaderNode = () =>
    rightHeader || (
      <Pressable
        style={({ pressed }) => [
          MasterStyles.actionBtn,
          pressed && styles.pressedBtn,
        ]}
        onPress={pressLogout}
        variant='trans'
      >
        <FontAwesome name='sign-out' size={20} color='black' />
      </Pressable>
    );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: screenName,
      headerTitleAlign: 'center',
      headerLeft: leftHeaderNode,
      headerRight: rightHeaderNode,
    });
  }, [lastScreen]);

  useEffect(() => {
    const x = router.canGoBack();
    if (!x) setLastScreen(true);
  }, []);

  return (
    <LinearGradient colors={Colors.$gradientsArray} style={styles.container}>
      <ImageBackground
        style={styles.loginImage}
        source={require('@/assets/images/bg.jpg')}
        resizeMode='cover'
        imageStyle={styles.imageBackground}
      >
        <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
      </ImageBackground>
      <AlertModal
        onCancel={handleCancel}
        onSubmit={logoutCurrentUser}
        modalStatus={modalStatus}
        statusMessage={statusMessage}
        onClose={handleCancel}
        alertIcon={'sign-out'}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: '100%',
    width: '100%',
  },
  loginImage: {
    borderRadius: 25,
  },
  imageBackground: {
    opacity: 0.25,
  },
  safeArea: {
    position: 'relative',
    width: screenWidth,
    height: '100%',
  },
  pressedBtn: {
    opacity: 0.5,
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    resizeMode: 'cover',
  },
});

export default AuthTemplate;
