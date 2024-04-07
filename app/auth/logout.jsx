import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import BaseTemplate from '@/wrappers/BaseTemplate';
import MasterButton from '@/components/MasterButton';
import Colors from '@/utils/Colors';
import Sizes from '@/utils/Sizes';

const logout = () => {
  const router = useRouter();

  const loaderMessage = 'Logged out successfully!';
  const loginBack = () => router.replace('/auth/login');

  return (
    <BaseTemplate>
      <View style={styles.loaderView}>
        <Text style={styles.loaderText}>{loaderMessage}</Text>
        <MasterButton onPress={loginBack} title='Login again' />
      </View>
    </BaseTemplate>
  );
};

export default logout;

const styles = StyleSheet.create({
  loaderView: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  loaderText: {
    fontSize: Sizes.$ieRegularFont,
    color: Colors.$midblue,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: Sizes.$ieLargePadding,
  },
});
