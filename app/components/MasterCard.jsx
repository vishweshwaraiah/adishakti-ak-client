import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import useMasterStyle from '@/utils/useMasterStyle';
import { useTheme } from '@/themes/ThemeProvider';

const MasterCard = (props) => {
  const { children, headerText, footerText } = props;

  const { theme } = useTheme();
  const mStyles = useMasterStyle();

  const styles = StyleSheet.create({
    card: {
      position: 'relative',
      borderRadius: 10,
      backgroundColor: theme.white,
      marginHorizontal: 5,
      marginVertical: 10,
      ...mStyles.commonShadow,
    },
    cardContainer: {
      marginHorizontal: 20,
      marginVertical: 10,
    },
    cardHeader: {
      borderBottomColor: theme.midblue,
      borderBottomWidth: 2,
      marginBottom: 10,
      paddingBottom: 10,
    },
    cardFooter: {
      borderTopColor: theme.midblue,
      borderTopWidth: 2,
      marginTop: 10,
      paddingTop: 10,
    },
  });

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
