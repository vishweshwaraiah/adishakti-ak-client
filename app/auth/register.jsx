import React, { useState } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  Text,
  Pressable,
  Keyboard,
  Platform,
  Alert,
  Animated,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import MasterButton from '@/components/MasterButton';
import MasterInput from '@/components/MasterInput';
import Sizes from '@/utils/Sizes';
import Colors from '@/utils/Colors';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { ServerUri } from '@/utils/Globals';
import BaseTemplate from '@/wrappers/BaseTemplate';

const screenWidth = Dimensions.get('window').width;

const register = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [pwdError, setPwdError] = useState(false);

  const clearInputs = () => {
    setName('');
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

    axios
      .post(ServerUri + '/register', user)
      .then((response) => {
        Alert.alert(
          response.data?.message,
          'You have been registered successfully!',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Ok',
              onPress: () => console.log('Ok Pressed'),
            },
          ]
        );
        clearInputs();
      })
      .catch((err) => {
        let message = 'An error occurred during registration!';
        if (err.message) {
          message = err.message;
        }
        Alert.alert('Registration Failed', message);
      });
  };

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
              <Text style={styles.title}>Register now!</Text>
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
                marginTop={Sizes.$ieExtraMargin}
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

export default register;

const styles = StyleSheet.create({
  registerBox: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
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
  switchScreen: {
    marginTop: 10,
    marginBottom: 10,
  },
});
