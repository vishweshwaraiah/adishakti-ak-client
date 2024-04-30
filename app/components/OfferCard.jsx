import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MasterCard from '@/components/MasterCard';

const OfferCard = (props) => {
  const { content = 'Default Card Content' } = props;

  return (
    <View style={{ width: '100%' }}>
      <MasterCard headerText='header' footerText='footer'>
        <Text>{content}</Text>
      </MasterCard>
    </View>
  );
};

export default OfferCard;

const styles = StyleSheet.create({});
