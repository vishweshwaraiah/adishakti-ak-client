import React from 'react';
import {
  Dimensions,
  StyleSheet,
  ImageBackground,
  View,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/themes/ThemeProvider';

const screenWidth = Dimensions.get('window').width;

const BaseTemplate = (props) => {
  const { children, containerStyle = {} } = props;

  const { theme } = useTheme();

  const styles = StyleSheet.create({
    defaultStyles: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      maxHeight: '100%',
      ...containerStyle,
    },
    loginImage: {
      borderRadius: 25,
      width: screenWidth,
    },
    imageBackground: {
      opacity: 0.25,
    },
  });

  return (
    <View style={styles.defaultStyles}>
      <LinearGradient colors={theme.gradientsArray}>
        <ImageBackground
          style={styles.loginImage}
          source={require('@/assets/images/bg.jpg')}
          resizeMode='cover'
          imageStyle={styles.imageBackground}
        >
          <SafeAreaView>{children}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </View>
  );
};

export default BaseTemplate;
