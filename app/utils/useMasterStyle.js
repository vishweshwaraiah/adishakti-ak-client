import { StyleSheet } from 'react-native';
import { useTheme } from '@/themes/ThemeProvider';
import Sizes from '@/utils/Sizes';

const useMasterStyle = () => {
  const { theme } = useTheme();

  const NavShadow = {
    shadowColor: theme.shadow,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  };

  const CommonShadow = {
    shadowColor: theme.shadow,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  };

  const DarkShadow = {
    shadowColor: theme.shadow,
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
      backgroundColor: theme.itemBg,
      borderWidth: 1,
      borderColor: theme.gray,
      padding: Sizes.$ieSmallPadding,
      borderRadius: Sizes.$ieRegularMargin,
      marginBottom: Sizes.$ieRegularMargin,
      ...CommonShadow,
    },
  });

  return MasterStyles;
};

export default useMasterStyle;
