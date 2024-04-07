import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '@/redux/slice/userData';
import BaseTemplate from '@/wrappers/BaseTemplate';
import MasterButton from '@/components/MasterButton';
import { useRouter } from 'expo-router';
import Sizes from '@/utils/Sizes';
import Colors from '@/utils/Colors';

const Loader = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, status, message } = useSelector((state) => state.userSlice);

  const [loaderMessage, setLoaderMessage] = useState('Loading you app!');

  const goToLogin = () => {
    router.replace('/auth/login');
  };

  const goToHome = () => {
    router.replace('/screens/home');
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

  useEffect(() => {
    const authTokenCheck = async () => {
      const userToken = await AsyncStorage.getItem('auth');

      if (userToken !== null) {
        dispatch(fetchUser(userToken));
      } else {
        goToLogin();
      }
    };

    authTokenCheck();
  }, []);

  return (
    <BaseTemplate>
      <View style={styles.loaderView}>
        <ActivityIndicator
          animating={true}
          size='large'
          color={Colors.$green}
        />
        <Text style={styles.loaderText}>{loaderMessage}</Text>
        <MasterButton onPress={goToLogin} title='Login again' />
      </View>
    </BaseTemplate>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loaderView: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  loaderText: {
    fontSize: Sizes.$ieRegularFont,
    color: Colors.$green,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: Sizes.$ieLargePadding,
  },
});
