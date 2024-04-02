import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseTemplate from '@/wrappers/BaseTemplate';
import { useRouter } from 'expo-router';
import Sizes from '@/utils/Sizes';

const Loader = () => {
  const router = useRouter();

  const [loaderMessage, setLoaderMessage] = useState('Loading you app!');

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('auth');
        if (token) {
          router.replace('/screens/home');
        } else {
          router.replace('/auth/login');
        }
      } catch (error) {
        if (error.message) {
          setLoaderMessage(error.message);
        } else {
          setLoaderMessage('Something went wrong!, please reload app');
        }
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <BaseTemplate>
      <View style={styles.loaderView}>
        <Text style={styles.loaderText}>{loaderMessage}</Text>
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
    fontSize: Sizes.$ieTitleFont,
    fontWeight: 'bold',
  },
});
