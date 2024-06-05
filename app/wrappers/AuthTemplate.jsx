import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  ImageBackground,
  View,
  Pressable,
} from 'react-native';
import { useRouter, useNavigation, usePathname } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { useTheme } from '@/themes/ThemeProvider';
import { clearUser } from '@/redux/slice/userData';
import { logoutUser } from '@/redux/slice/authData';
import MasterIcon from '@/components/MasterIcon';
import AlertModal from '@/components/Modals/AlertModal';
import useMasterStyle from '@/utils/useMasterStyle';
import Sizes from '@/utils/Sizes';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const AuthTemplate = (props) => {
  const { children, screenName = '', rightHeader = null } = props;
  const dispatch = useDispatch();

  const router = useRouter();
  const navigation = useNavigation();
  const pathname = usePathname();

  const { theme } = useTheme();
  const mStyles = useMasterStyle();

  const [lastScreen, setLastScreen] = useState(false);
  const [modalStatus, setModalStatus] = useState('close');

  const logoutMessage = 'Are you sure to logout?';

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
    const homePath = '/main_views/home/HomeScreen';
    if (pathname !== homePath) {
      router.replace(homePath);
    }
  };

  const leftHeaderNode = () => (
    <View style={styles.headerView}>
      {lastScreen ? (
        <Pressable
          style={({ pressed }) => [
            mStyles.actionBtn,
            pressed && styles.pressedBtn,
          ]}
          onPress={goHome}
          variant='trans'
        >
          <MasterIcon
            iconFamily='Ionicons'
            iconName='home'
            iconSize={20}
            iconColor={theme.itemColor}
          />
        </Pressable>
      ) : (
        <Pressable
          style={({ pressed }) => [
            mStyles.actionBtn,
            pressed && styles.pressedBtn,
          ]}
          onPress={goBack}
          variant='trans'
        >
          <MasterIcon
            iconFamily='FontAwesome'
            iconName='chevron-left'
            iconSize={20}
            iconColor={theme.itemColor}
          />
        </Pressable>
      )}
    </View>
  );

  const rightHeaderNode = () =>
    rightHeader || (
      <Pressable
        style={({ pressed }) => [
          mStyles.actionBtn,
          pressed && styles.pressedBtn,
        ]}
        onPress={pressLogout}
        variant='trans'
      >
        <MasterIcon
          iconFamily='FontAwesome'
          iconName='sign-out'
          iconSize={20}
          iconColor={theme.itemColor}
        />
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

  const availableScreenHeight = screenHeight - Sizes.$ieMenuSpace;

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
      flex: 1,
    },
    imageBackground: {
      opacity: 0.25,
    },
    safeArea: {
      position: 'relative',
      width: screenWidth,
      height: availableScreenHeight,
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

  return (
    <LinearGradient colors={theme.gradientsArray} style={styles.container}>
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
        statusMessage={logoutMessage}
        onClose={handleCancel}
        alertIcon={'sign-out'}
      />
    </LinearGradient>
  );
};

export default AuthTemplate;
