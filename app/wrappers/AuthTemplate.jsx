import React, { useLayoutEffect, useState } from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  ImageBackground,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Colors from '@/utils/Colors';
import Sizes from '@/utils/Sizes';

const screenWidth = Dimensions.get('window').width;

const AuthTemplate = (props) => {
  const { children, screenName = '', rightHeader = null } = props;

  const router = useRouter();
  const navigation = useNavigation();
  const [lastScreen, setLastScreen] = useState(false);

  const goBack = () => {
    if (router.canGoBack()) {
      setLastScreen(false);
      router.back();
    } else {
      setLastScreen(true);
    }
  };

  const leftHeaderNode = () => (
    <View style={styles.headerView}>
      {lastScreen ? (
        <View style={styles.isHome}>
          <Ionicons name='home' size={24} color='black' />
        </View>
      ) : (
        <TouchableOpacity onPress={goBack}>
          <FontAwesome name='chevron-circle-left' size={32} color='black' />
        </TouchableOpacity>
      )}
    </View>
  );

  const rightHeaderNode = () =>
    rightHeader || (
      <Pressable
        style={({ pressed }) => [
          styles.logoutBtn,
          pressed && styles.pressedBtn,
        ]}
        onPress={logoutUser}
        variant='trans'
      >
        <FontAwesome name='sign-out' size={20} color='black' />
      </Pressable>
    );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: screenName,
      headerLeft: leftHeaderNode,
      headerRight: rightHeaderNode,
    });
  }, [lastScreen]);

  const logoutUser = async () => {
    await AsyncStorage.removeItem('auth');
    await AsyncStorage.clear();
    router.push('/auth/login');
  };

  return (
    <LinearGradient colors={Colors.$gradientsArray} style={styles.container}>
      <ImageBackground
        style={styles.loginImage}
        source={require('@/assets/images/bg.jpg')}
        resizeMode='cover'
        imageStyle={styles.imageBackground}
      >
        <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
};

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
  },
  imageBackground: {
    opacity: 0.25,
  },
  safeArea: {
    position: 'relative',
    width: screenWidth,
    height: '100%',
  },
  logoutBtn: {
    position: 'relative',
    backgroundColor: Colors.$orange,
    padding: Sizes.$iePadding,
    borderRadius: Sizes.$ieMargin,
  },
  pressedBtn: {
    opacity: 0.5,
    padding: Sizes.$iePadding + 2,
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
  isHome: {
    backgroundColor: Colors.$orange,
    borderRadius: Sizes.$ieBorderRadius,
    padding: Sizes.$ieSmallPadding,
  },
});

export default AuthTemplate;
