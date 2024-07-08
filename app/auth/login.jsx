import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  Text,
  Alert,
  Animated,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { loginUser, resetState } from '@/redux/slice/authData';
import BaseTemplate from '@/wrappers/BaseTemplate';
import MasterButton from '@/components/MasterButton';
import MasterInput from '@/components/MasterInput';
import Sizes from '@/utils/Sizes';
import MonoText from '@/components/MonoText';
import { useTheme } from '@/themes/ThemeProvider';

const screenWidth = Dimensions.get('window').width;

const AppLogin = () => {
  const router = useRouter();
  const { status, token, message } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();

  const { theme } = useTheme();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userError, setUserError] = useState('');
  const [pwdError, setPwdError] = useState('');

  const getValue = (obj) => {
    if (obj.name === 'username') {
      setUsername(obj.value);
    }

    if (obj.name === 'password') {
      setPassword(obj.value);
    }
  };

  const blurHandler = (name, error) => {
    if (name === 'username' && error) setUserError(error);
    if (name === 'password' && error) setPwdError(error);
  };

  const handleLogin = () => {
    const user = {
      userName: username,
      userPassword: password,
    };

    if (!username) {
      setUserError('Username is required!');
    } else {
      setUserError('');
    }

    if (!password) {
      setPwdError('Password is required!');
    } else {
      setPwdError('');
    }

    const noData = !username || !password;

    if (noData) return false;

    dispatch(loginUser(user));
  };

  const setAuthToken = async () => {
    if (token !== null) {
      await AsyncStorage.setItem('auth', token);
      router.replace('/auth/loader');
    }
  };

  useEffect(() => {
    if (message && status === 'error') {
      Alert.alert('Login failed!', message);
      setTimeout(() => dispatch(resetState()), 500);
    }
    if (status === 'loggedin') {
      setAuthToken();
    }
  }, [status, message]);

  const styles = StyleSheet.create({
    loginBox: {
      alignItems: 'center',
      justifyContent: 'center',
      width: screenWidth,
      height: '100%',
      gap: Sizes.$ieFlexGapXLarge,
    },
    topView: {
      justifyContent: 'center',
      alignSelf: 'center',
      width: screenWidth - 150,
      height: screenWidth - 150,
    },
    bottomView: {
      width: screenWidth,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: Sizes.$ieRegularPadding,
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
      paddingHorizontal: Sizes.$ieLargePadding,
      width: screenWidth,
    },
    title: {
      color: theme.black,
      fontSize: Sizes.$ieTitleFont,
      textTransform: 'uppercase',
    },
    others: {
      width: '90%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: Sizes.$ieRegularMargin,
    },
    forgot_link: {
      color: theme.primary,
      fontWeight: '500',
    },
    switchScreen: {
      marginVertical: Sizes.$ieLargeMargin,
    },
  });

  return (
    <BaseTemplate>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.loginBox}>
            <Animated.View style={styles.topView}>
              <Image
                style={styles.brandImage}
                source={require('@/assets/images/logo.png')}
              ></Image>
            </Animated.View>
            <View style={styles.titleText}>
              <MonoText style={styles.title}>Log in!</MonoText>
            </View>
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
                required={true}
                size='large'
                spacing={10}
              />
              <MasterInput
                inputLabel='Password'
                type='password'
                textColor='light'
                onInput={getValue}
                onBlur={blurHandler}
                startIcon='password'
                iconFamily='MaterialIcons'
                name='password'
                value={password}
                error={pwdError}
                rounded={true}
                required={true}
                size='large'
                spacing={10}
              />
              <View style={styles.others}>
                <Text>Keep me logged in</Text>
                <TouchableOpacity
                  onPress={() => router.replace('/auth/forgot')}
                >
                  <Text style={styles.forgot_link}>Forgot Password</Text>
                </TouchableOpacity>
              </View>
              <MasterButton
                marginTop={Sizes.$ieRegularMargin}
                width={Sizes.$ieElementWidth}
                title='Login'
                onPress={handleLogin}
                variant='secondary'
                shape='round'
                height='large'
              />
              <TouchableOpacity
                style={styles.switchScreen}
                onPress={() => router.replace('/auth/register')}
              >
                <Text>Don't have an account? Sign up!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </BaseTemplate>
  );
};

export default AppLogin;
