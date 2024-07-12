import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppSettings } from '@/redux/slice/appSettings';
import { fetchUser, clearUser } from '@/redux/slice/userData';
import { logoutUser } from '@/redux/slice/authData';
import BaseTemplate from '@/wrappers/BaseTemplate';
import MasterButton from '@/components/MasterButton';
import { useTheme } from '@/themes/ThemeProvider';
import useMasterStyle from '@/utils/useMasterStyle';
import Sizes from '@/utils/Sizes';

const Loader = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, userStatus, message } = useSelector((state) => state.userSlice);

  const { theme } = useTheme();
  const mStyles = useMasterStyle();

  const [loaderMessage, setLoaderMessage] = useState('Loading you app!');
  const [actionTitle, setActionTitle] = useState('Retry');
  const [appStatus, setAppStatus] = useState('connected');

  const goToLogin = () => {
    router.replace('/auth/login');
  };

  const goToHome = () => {
    router.replace('/main_views/home');
  };

  const handleBtnAction = async () => {
    dispatch(logoutUser());
    dispatch(clearUser());
    if (appStatus === 'connected') {
      goToLogin();
    } else {
      setLoaderMessage('Turn on internet please!');
      setTimeout(() => loadApp(), 500);
    }
  };

  const checkLoginStatus = () => {
    const { userEmail, userMobile } = user;
    if (userEmail && userMobile) {
      dispatch(fetchAppSettings(userEmail));
      goToHome();
    } else {
      goToLogin();
    }
  };

  useEffect(() => {
    if (userStatus === 'error') {
      setLoaderMessage(message);
    }

    if (userStatus === 'fetchinguser') {
      setLoaderMessage('Loading the page...!');
    }

    if (userStatus === 'fetcheduser') {
      checkLoginStatus();
    }
  }, [user, userStatus]);

  const authTokenCheck = async () => {
    const userToken = await AsyncStorage.getItem('auth');

    if (userToken !== null) {
      dispatch(fetchUser(userToken));
    } else {
      goToLogin();
    }
  };

  const loadApp = () => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        setAppStatus('connected');
        authTokenCheck();
      } else {
        setAppStatus('disconnected');
        setLoaderMessage('Looks like you are offline!');
        setActionTitle('Refresh!');
      }
    });
  };

  useEffect(() => {
    loadApp();
  }, []);

  const styles = StyleSheet.create({
    containerStyle: {
      position: 'relative',
    },
    loaderView: {
      width: '100%',
      height: '100%',
      backgroundColor: theme.modalBackground,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    loaderBox: {
      width: '60%',
      height: 250,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: theme.modalBodyBg,
      borderRadius: Sizes.$ieLargeRadius,
      padding: Sizes.$ieExtraPadding,
      ...mStyles.commonShadow,
    },
    loaderText: {
      fontSize: Sizes.$ieRegularFont,
      color: theme.green,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingTop: Sizes.$ieLargePadding,
    },
  });

  return (
    <BaseTemplate containerStyle={styles.containerStyle}>
      <View style={styles.loaderView}>
        <View style={styles.loaderBox}>
          <ActivityIndicator
            animating={true}
            size='large'
            color={theme.green}
          />
          <Text style={styles.loaderText}>{loaderMessage}</Text>
          {(userStatus === 'error' || appStatus === 'disconnected') && (
            <MasterButton
              onPress={handleBtnAction}
              variant='light'
              textColor={theme.green}
              title={actionTitle}
              marginTop={Sizes.$ieLargeMargin}
            />
          )}
        </View>
      </View>
    </BaseTemplate>
  );
};

export default Loader;
