import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  ImageBackground,
  View,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { clearUser } from '@/redux/slice/userData';
import AlertModal from '@/components/Modals/AlertModal';
import MasterStyles from '@/utils/MasterStyles';
import Colors from '@/utils/Colors';
import { useDispatch } from 'react-redux';

const screenWidth = Dimensions.get('window').width;

const AuthTemplate = (props) => {
  const { children, screenName = '', rightHeader = null } = props;
  const dispatch = useDispatch();

  const router = useRouter();
  const navigation = useNavigation();

  const [lastScreen, setLastScreen] = useState(false);
  const [modalStatus, setModalStatus] = useState('close');

  const statusMessage = 'Are you sure to logout?';

  const logoutUser = async () => {
    await AsyncStorage.removeItem('auth');
    await AsyncStorage.clear();
    dispatch(clearUser());
    router.push('/auth/login');
    setModalStatus('close');
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

  const leftHeaderNode = () => (
    <View style={styles.headerView}>
      {lastScreen ? (
        <View style={MasterStyles.actionBtn}>
          <Ionicons name='home' size={20} color='black' />
        </View>
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
        onSubmit={logoutUser}
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
