import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  Text,
  Pressable,
  Alert,
  Animated,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import axios from 'axios';
import MasterButton from '@/components/MasterButton';
import MasterInput from '@/components/MasterInput';
import Sizes from '@/utils/Sizes';
import Colors from '@/utils/Colors';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { server_uri } from '@/utils/Globals';
import BaseTemplate from '@/wrappers/BaseTemplate';

const screenWidth = Dimensions.get('window').width;

const login = () => {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userError, setUserError] = useState(false);
  const [pwdError, setPwdError] = useState(false);

  const getValue = (obj) => {
    if (obj.name === 'username') {
      setUsername(obj.value);
    }

    if (obj.name === 'password') {
      setPassword(obj.value);
    }
  };

  const blurHandler = (name, error) => {
    if (name === 'username') setUserError(error);
    if (name === 'password') setPwdError(error);
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('auth');
        if (token) {
          router.replace('/screens/home');
        }
      } catch (error) {
        console.log('Error', error.message);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    const user = {
      email: username,
      password,
    };

    if (!username) setUserError(true);
    if (!password) setPwdError(true);

    const noData = !username || !password;
    const hasErrs = userError || pwdError;

    if (noData || hasErrs) {
      return false;
    }

    axios
      .post(server_uri + '/login', user)
      .then((response) => {
        const token = response.data?.token;
        AsyncStorage.setItem('auth', token);
        router.replace('/screens/home');
      })
      .catch((err) => {
        Alert.alert('Login failed!', err.message);
      });
  };

  return (
    <BaseTemplate>
      <KeyboardAvoidingView behavior='position' style={styles.container}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.loginBox}>
            <View style={styles.titleText}>
              <Text style={styles.title}>Login into Account!</Text>
            </View>
            <Animated.View style={styles.topView}>
              <Image
                style={styles.brandImage}
                source={require('@/assets/images/logo.png')}
              ></Image>
            </Animated.View>
            <View style={styles.bottomView}>
              <MasterInput
                inputLabel='Email/Mobile'
                textColor='light'
                onInput={getValue}
                onBlur={blurHandler}
                startIcon='login'
                iconFamily='AntDesign'
                name='username'
                type='email'
                value={username}
                error={userError}
                rounded={true}
                size='large'
              />
              <MasterInput
                inputLabel='Password'
                type='password'
                textColor='light'
                onInput={getValue}
                onBlur={blurHandler}
                startIcon='password'
                name='password'
                value={password}
                error={pwdError}
                rounded={true}
                size='large'
              />
              <View style={styles.others}>
                <Text>Keep me logged in</Text>
                <Text style={styles.forgot_link}>Forgot Password</Text>
              </View>
              <MasterButton
                marginTop={Sizes.$ieMargin}
                width={Sizes.$ieElementWidth}
                title='Login'
                onPress={handleLogin}
                variant='secondary'
                shape='round'
                height='large'
              />
              <Pressable
                style={styles.switchScreen}
                onPress={() => router.replace('/auth/register')}
              >
                <Text>Don't have an account? Sign up!</Text>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </BaseTemplate>
  );
};

export default login;

const styles = StyleSheet.create({
  loginBox: {
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    width: screenWidth,
    height: '100%',
    gap: 0,
  },
  topView: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: screenWidth - 100,
    height: screenWidth - 100,
  },
  bottomView: {
    width: screenWidth,
    maxHeight: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  brandImage: {
    alignSelf: 'center',
    width: '100%',
    height: '100%',
  },
  titleText: {
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 0,
    opacity: 0.8,
    paddingHorizontal: 24,
    width: screenWidth,
  },
  title: {
    color: Colors.$black,
    fontSize: 30,
    fontFamily: 'Marker Felt',
    textTransform: 'uppercase',
  },
  others: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forgot_link: {
    color: Colors.$primary,
    fontWeight: 500,
  },
  switchScreen: {
    marginTop: 10,
    marginBottom: 10,
  },
});
