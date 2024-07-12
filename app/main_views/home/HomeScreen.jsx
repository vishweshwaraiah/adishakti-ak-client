import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import AuthTemplate from '@/wrappers/AuthTemplate';
import Sizes from '@/utils/Sizes';
import OfferCard from '@/components/OfferCard';
import { useTheme } from '@/themes/ThemeProvider';
import BottomSheet from '@/components/Modals/BottomSheet';

const HomeScreen = () => {
  const { theme } = useTheme();

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
      color: theme.titleColor,
    },
    homeContent: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

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
      <BottomSheet sheetHeight={1} />
    </AuthTemplate>
  );
};

export default HomeScreen;
