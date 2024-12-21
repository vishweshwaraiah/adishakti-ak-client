import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  ImageBackground,
  View,
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
import AppConstants from '@/utils/AppConstants';
import useMasterMenu from '@/utils/useMasterMenu';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const AuthTemplate = (props) => {
  const { children, screenName = '', rightHeader = null } = props;
  const dispatch = useDispatch();

  const router = useRouter();
  const navigation = useNavigation();
  const pathname = usePathname();

  const gradientsArray = ['#FFA500', '#FFFFFF'];
  const { theme } = useTheme();
  const mStyles = useMasterStyle();

  const [homeScreen, setHomeScreen] = useState(false);
  const [modalStatus, setModalStatus] = useState('close');

  const { homePath } = AppConstants;
  const logoutMessage = 'Are you sure to logout?';

  const logoutCurrentUser = () => {
    setModalStatus('close');
    setTimeout(() => {
      dispatch(logoutUser());
      dispatch(clearUser());
      router.navigate('/auth/login');
    }, 1000);
  };

  const handleCancel = () => {
    setModalStatus('close');
  };

  const pressLogout = () => {
    setModalStatus('open');
  };

  const uMm = useMasterMenu();

  const goBack = () => {
    uMm.updateMenus();

    if (router.canGoBack()) {
      router.back();
    }
  };

  useEffect(() => {
    setHomeScreen(pathname === homePath);
  }, [pathname]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: screenName,
      headerTitleAlign: 'center',
      headerLeft: leftHeaderNode,
      headerRight: rightHeaderNode,
      headerStyle: { backgroundColor: theme.appHeaderBg },
      headerTitleStyle: {
        color: theme.appHeaderColor,
      },
    });
  }, [screenName, theme, homeScreen]);

  useEffect(() => {
    const x = router.canGoBack();
    if (!x) setHomeScreen(true);
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

  const leftHeaderNode = () => (
    <View style={styles.headerView}>
      {homeScreen ? (
        <MasterIcon
          iconFamily='Ionicons'
          iconName='home'
          iconSize={20}
          iconColor={theme.itemColor}
          iconStyles={mStyles.actionBtn}
          isInteractive={true}
        />
      ) : (
        <MasterIcon
          iconFamily='FontAwesome'
          iconName='chevron-left'
          iconSize={20}
          iconColor={theme.itemColor}
          iconStyles={mStyles.actionBtn}
          isInteractive={true}
          onPress={goBack}
        />
      )}
    </View>
  );

  const rightHeaderNode = () =>
    rightHeader || (
      <MasterIcon
        iconFamily='FontAwesome'
        iconName='sign-out'
        iconSize={20}
        iconColor={theme.itemColor}
        iconStyles={mStyles.actionBtn}
        isInteractive={true}
        onPress={pressLogout}
      />
    );

  return (
    <LinearGradient
      colors={theme.gradientsArray || gradientsArray}
      style={styles.container}
    >
      <ImageBackground
        style={styles.loginImage}
        source={require('@/assets/images/app_bg.jpg')}
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
        afterAction='initial'
      />
    </LinearGradient>
  );
};

export default AuthTemplate;
