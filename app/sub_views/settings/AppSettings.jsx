import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AuthTemplate from '@/wrappers/AuthTemplate';
import { toggleMenuStyle } from '@/redux/slice/appSettings';
import MasterSwitch from '@/components/MasterSwitch';
import useMasterStyle from '@/utils/useMasterStyle';
import Sizes from '@/utils/Sizes';
import { useTheme } from '@/themes/ThemeProvider';
import MasterSelect from '@/components/MasterSelect';

const AppSettings = () => {
  const dispatch = useDispatch();

  const { theme, switchTheme } = useTheme();
  const mStyles = useMasterStyle();

  const defaultSelect = {
    label: 'Switch to different theme',
    value: 'default',
  };

  const selectOptions = [
    { label: 'Set to Light', value: 'light' },
    { label: 'Set to Dark', value: 'dark' },
  ];

  const { menuType } = useSelector((state) => state.appSettings);
  const [switchValue, setSwitchValue] = useState(false);

  const changeTheme = (item) => {
    switchTheme(item.value);
  };

  const onChange = (value) => {
    let menuType = 'bottom';
    if (value === true) {
      menuType = 'floating';
    }
    dispatch(toggleMenuStyle(menuType));
  };

  useEffect(() => {
    if (menuType === 'floating') {
      setSwitchValue(true);
    } else {
      setSwitchValue(false);
    }
  }, [menuType]);

  const styles = StyleSheet.create({
    settingsBox: {
      flex: 1,
      padding: Sizes.$ieRegularPadding,
      backgroundColor: 'transparent',
    },
    settingsRow: {
      padding: Sizes.$ieRegularPadding,
      backgroundColor: theme.itemBg,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: Sizes.$ieRegularRadius,
      marginBottom: Sizes.$ieRegularMargin,
      ...mStyles.commonShadow,
    },
  });

  return (
    <AuthTemplate screenName='Edit Settings'>
      <View style={styles.settingsBox}>
        <View style={styles.settingsRow}>
          <Text>Enable Floating Menu Style</Text>
          <MasterSwitch defValue={switchValue} onChange={onChange} />
        </View>
        <MasterSelect
          defaultSelect={defaultSelect}
          selectData={selectOptions}
          onSelect={changeTheme}
        />
      </View>
    </AuthTemplate>
  );
};

export default AppSettings;
