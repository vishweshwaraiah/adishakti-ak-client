import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AuthTemplate from '@/wrappers/AuthTemplate';
import Sizes from '@/utils/Sizes';

const HomeScreen = () => {
  return (
    <AuthTemplate screenName='Home'>
      <View style={styles.titleContainer}>
        <Text style={styles.sectionTitle}>Home</Text>
      </View>
      <View style={styles.homeContent}>
        <Text style={styles.sectionTitle}>
          Welcome to The Janagouda's World..!.
        </Text>
      </View>
    </AuthTemplate>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: 32,
    paddingHorizontal: 20,
    paddingVertical: Sizes.$ieRegularPadding,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  homeContent: {
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
