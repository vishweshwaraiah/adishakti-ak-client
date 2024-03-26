import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AuthTemplate from '@/wrappers/AuthTemplate';

const ProfileScreen = () => {
  return (
    <AuthTemplate screenName='Edit Profile'>
      <View>
        <Text>Profile</Text>
      </View>
    </AuthTemplate>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
