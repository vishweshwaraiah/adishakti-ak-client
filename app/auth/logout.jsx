import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import BaseTemplate from '@/wrappers/BaseTemplate';
import MasterButton from '@/components/MasterButton';
import Sizes from '@/utils/Sizes';
import { useTheme } from '@/themes/ThemeProvider';

const AppLogout = () => {
  const router = useRouter();

  const { theme } = useTheme();

  const loaderMessage = 'Logged out successfully!';
  const loginBack = () => router.replace('/auth/login');

  const styles = StyleSheet.create({
    loaderView: {
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    loaderText: {
      fontSize: Sizes.$ieRegularFont,
      color: theme.midblue,
      fontWeight: 'bold',
      textAlign: 'center',
      padding: Sizes.$ieLargePadding,
    },
  });

  return (
    <BaseTemplate>
      <View style={styles.loaderView}>
        <Text style={styles.loaderText}>{loaderMessage}</Text>
        <MasterButton onPress={loginBack} title='Login again' />
      </View>
    </BaseTemplate>
  );
};

export default AppLogout;
