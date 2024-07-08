import { View, Text, StyleSheet } from 'react-native';
import MasterButton from '@/components/MasterButton';
import { useTheme } from '@/themes/ThemeProvider';
import Sizes from '@/utils/Sizes';

const Fallback = ({ error, resetErrorBoundary }) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    errorBoundary: {
      flex: 1,
      padding: Sizes.$ieLargePadding,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      fontSize: Sizes.$ieTitleFont,
    },
  });

  return (
    <View style={styles.errorBoundary} role='alert'>
      <Text style={styles.errorText}>Something went wrong:</Text>
      <Text style={{ color: 'red', marginVertical: 10 }}>{error.message}</Text>
      <MasterButton
        variant={theme.itemBg}
        textColor={theme.itemColor}
        onPress={resetErrorBoundary}
        title='Refresh App!'
      />
    </View>
  );
};

export default Fallback;
