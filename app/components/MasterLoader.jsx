import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import MasterButton from '@/components/MasterButton';
import { useTheme } from '@/themes/ThemeProvider';
import useMasterStyle from '@/utils/useMasterStyle';
import Sizes from '@/utils/Sizes';

const MasterLoader = (props) => {
  const {
    loaderMessage = 'Loading...',
    actionBtn = false,
    onAction = () => {},
    actionTitle = '',
  } = props;

  const handleBtnAction = () => {
    onAction();
  };

  const { theme } = useTheme();
  const mStyles = useMasterStyle();

  const styles = StyleSheet.create({
    loaderView: {
      width: '100%',
      height: '100%',
      backgroundColor: theme.modalBackdrop,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    loaderBox: {
      width: '60%',
      height: 250,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: theme.modalBgColor,
      borderRadius: Sizes.$ieLargeRadius,
      padding: Sizes.$ieExtraPadding,
      ...mStyles.commonShadow,
    },
    loaderText: {
      fontSize: Sizes.$ieRegularFont,
      color: theme.modalTxtColor,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingTop: Sizes.$ieLargePadding,
    },
  });

  return (
    <View style={styles.loaderView}>
      <View style={styles.loaderBox}>
        <ActivityIndicator
          animating={true}
          size='large'
          color={theme.loaderIcon}
        />
        <Text style={styles.loaderText}>{loaderMessage}</Text>
        {actionBtn && (
          <MasterButton
            onPress={handleBtnAction}
            variant='light'
            textColor={theme.loaderBtn}
            title={actionTitle}
            marginTop={Sizes.$ieLargeMargin}
          />
        )}
      </View>
    </View>
  );
};

export default MasterLoader;
