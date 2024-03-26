import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '@/utils/Colors';
import MasterStyles from '@/utils/MasterStyles';

const MasterCard = (props) => {
  const { children, headerText, footerText } = props;

  return (
    <View style={styles.card}>
      <View style={styles.cardContainer}>
        {headerText && (
          <View style={styles.cardHeader}>
            <Text>{headerText}</Text>
          </View>
        )}
        <View style={styles.cardBody}>{children}</View>
        {footerText && (
          <View style={styles.cardFooter}>
            <Text>{footerText}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default MasterCard;

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    borderRadius: 10,
    backgroundColor: Colors.$white,
    marginHorizontal: 5,
    marginVertical: 10,
    ...MasterStyles.commonShadow,
  },
  cardContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  cardHeader: {
    borderBottomColor: Colors.$midblue,
    borderBottomWidth: 2,
    marginBottom: 10,
    paddingBottom: 10,
  },
  cardFooter: {
    borderTopColor: Colors.$midblue,
    borderTopWidth: 2,
    marginTop: 10,
    paddingTop: 10,
  },
});
