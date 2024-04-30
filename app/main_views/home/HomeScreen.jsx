import React, { useEffect } from 'react';
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
        <View>
          <OfferCard
            content='Card 1 and some default text to fill the view and check if it
          overflows or not'
          />
          <OfferCard
            content='Card 2 and some default text to fill the view and check if it
          overflows or not'
          />
          <OfferCard
            content='Card 3 and some default text to fill the view and check if it
          overflows or not'
          />
        </View>
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
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

export default HomeScreen;
