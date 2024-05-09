import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AuthTemplate from '@/wrappers/AuthTemplate';
import { toggleMenuStyle } from '@/redux/slice/appSettings';
import MasterSwitch from '@/components/MasterSwitch';
import MasterStyles from '@/utils/MasterStyles';
import Sizes from '@/utils/Sizes';
import Colors from '@/utils/Colors';

const AppSettings = () => {
  const dispatch = useDispatch();
  const { menuType } = useSelector((state) => state.appSettings);
  const [switchValue, setSwitchValue] = useState(false);

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

  return (
    <AuthTemplate screenName='Edit Settings'>
      <View style={styles.settingsBox}>
        <View style={styles.settingsRow}>
          <Text>Enable Floating Menu Style</Text>
          <MasterSwitch defValue={switchValue} onChange={onChange} />
        </View>
      </View>
    </AuthTemplate>
  );
};

export default AppSettings;

const styles = StyleSheet.create({
  settingsBox: {
    flex: 1,
    padding: Sizes.$ieRegularPadding,
    backgroundColor: 'transparent',
  },
  settingsRow: {
    padding: Sizes.$ieRegularPadding,
    backgroundColor: Colors.$itemBg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: Sizes.$ieRegularRadius,
    ...MasterStyles.commonShadow,
  },
});
