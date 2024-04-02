import { StyleSheet } from 'react-native';
import Colors from '@/utils/Colors';
import Sizes from '@/utils/Sizes';

const NavShadow = {
  shadowColor: Colors.$shadow,
  shadowOffset: {
    width: 0,
    height: 10,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.5,
  elevation: 5,
};

const CommonShadow = {
  shadowColor: Colors.$shadow,
  shadowOffset: { width: -2, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
  elevation: 2,
};

const DarkShadow = {
  shadowColor: Colors.$shadow,
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: 0.8,
  shadowRadius: 5,
  elevation: 5,
};

const MasterStyles = StyleSheet.create({
  navShadow: NavShadow,
  commonShadow: CommonShadow,
  darkShadow: DarkShadow,
  actionBtn: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: Sizes.$ieActionBtn,
    height: Sizes.$ieActionBtn,
    position: 'relative',
    backgroundColor: Colors.$white,
    borderWidth: 1,
    borderColor: Colors.$gray,
    padding: Sizes.$ieSmallPadding,
    borderRadius: Sizes.$ieRegularMargin,
    marginBottom: Sizes.$ieRegularMargin,
    ...CommonShadow,
  },
});

export default MasterStyles;
