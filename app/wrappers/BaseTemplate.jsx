import React from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  ImageBackground,
  ScrollView,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Sizes from '@/utils/Sizes';
import Colors from '@/utils/Colors';

const screenWidth = Dimensions.get('window').width;

const BaseTemplate = (props) => {
  const { children, containerStyle = {} } = props;

  const styles = StyleSheet.create({
    defaultStyles: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      maxHeight: '100%',
      ...containerStyle,
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

  return (
    <View style={styles.defaultStyles}>
      <LinearGradient colors={Colors.$gradientsArray}>
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
    </View>
  );
};

export default BaseTemplate;
