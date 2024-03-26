import { StyleSheet } from 'react-native';
import Colors from '@/utils/Colors';

const MasterStyles = StyleSheet.create({
  navShadow: {
    shadowColor: Colors.$shadow,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  commonShadow: {
    shadowColor: Colors.$shadow,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  darkShadow: {
    shadowColor: Colors.$shadow,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default MasterStyles;
