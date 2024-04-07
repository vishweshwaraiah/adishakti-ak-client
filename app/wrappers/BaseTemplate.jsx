import React from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Sizes from '@/utils/Sizes';
import Colors from '@/utils/Colors';

const screenWidth = Dimensions.get('window').width;

const BaseTemplate = (props) => {
  const { children } = props;

  return (
    <LinearGradient colors={Colors.$gradientsArray} style={styles.container}>
      <ImageBackground
        style={styles.loginImage}
        source={require('@/assets/images/bg.jpg')}
        resizeMode='cover'
        imageStyle={styles.imageBackground}
      >
        <ScrollView contentContainerStyle={styles.mainScreen}>
          <SafeAreaView>{children}</SafeAreaView>
        </ScrollView>
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
  },
  mainScreen: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    paddingVertical: Sizes.$isLargePadding,
  },
  loginImage: {
    borderRadius: 25,
    width: screenWidth,
    height: '100%',
  },
  imageBackground: {
    opacity: 0.25,
  },
});

export default BaseTemplate;
