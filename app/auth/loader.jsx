import React, { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useRootNavigationState } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppSettings } from '@/redux/slice/appSettings';
import { fetchUser } from '@/redux/slice/userData';
import MasterLoader from '@/components/MasterLoader';
import BaseTemplate from '@/wrappers/BaseTemplate';
import { StyleSheet } from 'react-native';

const Loader = () => {
  const router = useRouter();
  const rootNavState = useRootNavigationState();
  const dispatch = useDispatch();
  const { user, userStatus } = useSelector((state) => state.userSlice);

  const [loaderMessage, setLoaderMessage] = useState('Loading you app!');
  const [actionTitle, setActionTitle] = useState('Retry');
  const [appStatus, setAppStatus] = useState('connected');
  const [actionBtn, setActionBtn] = useState(false);

  const goToLogin = () => {
    router.replace('/auth/login');
  };

  const goToHome = () => {
    router.replace('/main_views/home');
  };

  const handleBtnAction = async () => {
    if (appStatus === 'connected') {
      setLoaderMessage('Server is down, try again!');
      setTimeout(() => loadApp(), 500);
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

  const appLoader = () => <MasterLoader />;

  useEffect(() => {
    if (!rootNavState?.key) return appLoader;

    if (userStatus === 'error') {
      setActionBtn(true);
      setLoaderMessage('Error fetching user details!');
    }

    if (userStatus === 'fetchinguser') {
      setLoaderMessage('Fetching user details!');
    }

    if (userStatus === 'fetcheduser') {
      checkLoginStatus();
    }
  }, [user, userStatus]);

  const authTokenCheck = async () => {
    const userToken = await AsyncStorage.getItem('auth');

    if (userToken !== null) {
      dispatch(fetchUser());
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
        setActionBtn(true);
        setAppStatus('disconnected');
        setActionTitle('Refresh!');
        setLoaderMessage('Looks like you are offline!');
      }
    });
  };

  useEffect(() => {
    loadApp();
  }, []);

  const styles = StyleSheet.create({
    authLoader: {
      display: 'flex',
      flex: 1,
    },
  });

  return (
    <BaseTemplate containerStyle={styles.authLoader}>
      <MasterLoader
        actionBtn={actionBtn}
        onAction={handleBtnAction}
        actionTitle={actionTitle}
        loaderMessage={loaderMessage}
      />
    </BaseTemplate>
  );
};

export default Loader;
