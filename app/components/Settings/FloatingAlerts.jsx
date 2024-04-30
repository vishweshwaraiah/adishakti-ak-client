import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Sizes from '@/utils/Sizes';

const FloatingAlerts = () => {
  return (
    <SafeAreaView>
      <View style={styles.alertBox}>
        <TouchableOpacity style={styles.closebtn}>
          <Text>&times;</Text>
        </TouchableOpacity>
        <Text>
          Danger! Indicates a dangerous or potentially negative action.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default FloatingAlerts;

const styles = StyleSheet.create({
  alertBox: {
    padding: 10,
    backgroundColor: '#f44336',
    color: 'white',
    flexDirection: 'row',
    borderRadius: Sizes.$ieLargeRadius,
    overflow: 'hidden',
  },
  closebtn: {
    marginLeft: 10,
    transition: '0.3s',
  },
});
