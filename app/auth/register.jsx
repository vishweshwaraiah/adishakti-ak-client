import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  Text,
  Pressable,
  Keyboard,
  Alert,
  Animated,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MasterButton from '@/components/MasterButton';
import MasterInput from '@/components/MasterInput';
import Sizes from '@/utils/Sizes';
import Colors from '@/utils/Colors';
import { useRouter } from 'expo-router';
import BaseTemplate from '@/wrappers/BaseTemplate';
import { registerUser } from '@/redux/slice/authData';
import { clearUser } from '@/redux/slice/userData';

const screenWidth = Dimensions.get('window').width;

const AppRegister = () => {
  const router = useRouter();
  const { status, message } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [pwdError, setPwdError] = useState(false);

  const clearInputs = () => {
    setEmail('');
    setMobile('');
    setPassword('');
  };

  const blurHandler = (name, error) => {
    if (name === 'email') setEmailError(error);
    if (name === 'mobile') setMobileError(error);
    if (name === 'password') setPwdError(error);
  };

  const handleRegister = () => {
    const user = {
      email,
      mobile,
      password,
    };

    if (!email) setEmailError(true);
    if (!mobile) setMobileError(true);
    if (!password) setPwdError(true);

    const noData = !email || !mobile || !password;
    const hasErrs = emailError || mobileError || pwdError;

    if (noData || hasErrs) {
      return false;
    }

    dispatch(registerUser(user));
  };

  useEffect(() => {
    if (status === 'error' && message !== '') {
      Alert.alert('Registration Failed', message);
    }

    if (status === 'loaded' && message !== '') {
      Alert.alert('Success!', message);
      clearInputs();
      dispatch(clearUser());
    }
  }, [status, message]);

  const getValue = (obj) => {
    if (obj.name === 'email') {
      setEmail(obj.value);
    }

    if (obj.name === 'mobile') {
      setMobile(obj.value);
    }

    if (obj.name === 'password') {
      setPassword(obj.value);
    }
  };

  return (
    <BaseTemplate>
      <KeyboardAvoidingView behavior='position' style={styles.container}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.registerBox}>
            <View style={styles.titleText}>
              <Text style={styles.title}>Register!</Text>
            </View>
            <Animated.View style={styles.topView}>
              <Image
                style={styles.brandImage}
                source={require('@/assets/images/logo.png')}
              ></Image>
            </Animated.View>
            <View style={styles.bottomView}>
              <MasterInput
                inputLabel='Email'
                textColor='light'
                onInput={getValue}
                onBlur={blurHandler}
                startIcon='email'
                name='email'
                type='email'
                value={email}
                error={emailError}
                rounded={true}
                size='large'
              />
              <MasterInput
                inputLabel='Mobile'
                type='number'
                textColor='light'
                onInput={getValue}
                onBlur={blurHandler}
                startIcon='phone'
                name='mobile'
                value={mobile}
                iconFamily='FontAwesome'
                error={mobileError}
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

              <MasterButton
                marginTop={Sizes.$ieLargeMargin}
                width={Sizes.$ieElementWidth}
                title='Register'
                onPress={handleRegister}
                variant='secondary'
                shape='round'
                height='large'
              />
              <Pressable
                style={styles.switchScreen}
                onPress={() => router.replace('/auth/login')}
              >
                <Text>Already a member? Sign in!</Text>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </BaseTemplate>
  );
};

export default AppRegister;

const styles = StyleSheet.create({
  registerBox: {
    alignItems: 'center',
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
    maxHeight: '60%',
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
    color: Colors.$black,
    fontSize: Sizes.$ieTitleFont,
    textTransform: 'uppercase',
  },
  switchScreen: {
    marginVertical: Sizes.$ieLargeMargin,
  },
});
