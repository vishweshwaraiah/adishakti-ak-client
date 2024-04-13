import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '@/redux/slice/userData';
import BaseTemplate from '@/wrappers/BaseTemplate';
import MasterButton from '@/components/MasterButton';
import { useRouter } from 'expo-router';
import Sizes from '@/utils/Sizes';
import Colors from '@/utils/Colors';
import MasterStyles from '@/utils/MasterStyles';

const Loader = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, status, message } = useSelector((state) => state.userSlice);

  const [loaderMessage, setLoaderMessage] = useState('Loading you app!');
  const [actionTitle, setActionTitle] = useState('');
  const [appStatus, setAppStatus] = useState('connected');

  const goToLogin = () => {
    router.replace('/auth/login');
  };

  const goToHome = () => {
    router.replace('/screens/home');
  };

  const handleBtnAction = () => {
    if (appStatus === 'connected') {
      goToLogin();
    } else {
      loadApp();
      setLoaderMessage('Turn on internet please!');
    }
  };

  useEffect(() => {
    if (status === 'error') {
      setLoaderMessage(message);
    }

    if (status === 'loading') {
      setLoaderMessage('Loading The Page...!');
    }

    if (status === 'loaded') {
      const checkLoginStatus = () => {
        if (user.email && user.mobile) {
          goToHome();
        } else {
          goToLogin();
        }
      };

      checkLoginStatus();
    }
  }, [user, status]);

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
      backgroundColor: Colors.$modalBackground,
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
      backgroundColor: Colors.$modalBodyBg,
      borderRadius: Sizes.$ieLargeRadius,
      padding: Sizes.$ieExtraPadding,
      ...MasterStyles.commonShadow,
    },
    loaderText: {
      fontSize: Sizes.$ieRegularFont,
      color: Colors.$green,
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
            color={Colors.$green}
          />
          <Text style={styles.loaderText}>{loaderMessage}</Text>
          {(status === 'error' || appStatus === 'disconnected') && (
            <MasterButton
              onPress={handleBtnAction}
              variant='light'
              textColor={Colors.$green}
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
