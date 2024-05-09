import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import AuthTemplate from '@/wrappers/AuthTemplate';
import Sizes from '@/utils/Sizes';
import OfferCard from '@/components/OfferCard';

const HomeScreen = () => {
  return (
    <AuthTemplate screenName='Home'>
      <View style={styles.titleContainer}>
        <Text style={styles.sectionTitle}>Offers!</Text>
      </View>
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={styles.homeContent}
      >
        <OfferCard content='Some text goes here.' />
      </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
