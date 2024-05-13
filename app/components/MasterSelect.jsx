import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Sizes from '@/utils/Sizes';
import useMasterStyle from '@/utils/useMasterStyle';
import { useTheme } from '@/themes/ThemeProvider';

const MasterSelect = (props) => {
  const { defaultSelect, selectData, onSelect } = props;

  const { theme } = useTheme();
  const mStyles = useMasterStyle();

  const DropdownButton = useRef();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(undefined);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [selectLabel, setSelectLabel] = useState('');

  const toggleDropdown = () => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = () => {
    DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h + 2);
    });
    setVisible(true);
  };

  const onItemPress = (item) => {
    item.selected = true;
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  useEffect(() => {
    // This use-effect is to reset the selected label back to default
    setSelectLabel(defaultSelect);
    setSelected(undefined);
  }, [defaultSelect]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[
          styles.selectOption,
          item.value === selected?.value && styles.isSelected,
        ]}
        onPress={() => onItemPress(item)}
      >
        <Text>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  const getLabel = (item) => {
    if (item) {
      return item?.label;
    } else {
      return selectLabel.label;
    }
  };

  const renderDropdown = () => {
    return (
      <Modal visible={visible} transparent animationType='fade'>
        <TouchableOpacity style={styles.selectOverlay} onPress={toggleDropdown}>
          <View style={[styles.selectDropdown, { top: dropdownTop }]}>
            <FlatList
              data={selectData}
              renderItem={renderItem}
              keyExtractor={(item) => item.value.toString()}
              style={styles.dropdownList}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  const styles = StyleSheet.create({
    selectButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.white,
      height: Sizes.$ieLargeHeight,
      zIndex: 1,
      borderRadius: Sizes.$ieRegularRadius,
      zIndex: 201,
      ...mStyles.commonShadow,
    },
    buttonText: {
      flex: 1,
      textAlign: 'left',
      marginLeft: Sizes.$ieRegularMargin,
    },
    icon: {
      marginRight: Sizes.$ieRegularMargin,
    },
    selectDropdown: {
      position: 'absolute',
      backgroundColor: theme.white,
      width: '95%',
      paddingBottom: Sizes.$ieRegularPadding,
      borderBottomLeftRadius: Sizes.$ieRegularRadius,
      borderBottomRightRadius: Sizes.$ieRegularRadius,
      borderTopWidth: 5,
      borderColor: theme.primary,
      ...mStyles.darkShadow,
    },
    selectOverlay: {
      width: '100%',
      height: '100%',
      margin: 'auto',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: theme.modalBackground,
      zIndex: 200,
    },
    dropdownList: {
      width: '100%',
    },
    selectOption: {
      padding: Sizes.$ieRegularPadding,
      justifyContent: 'center',
      height: Sizes.$ieLargeHeight,
      borderBottomWidth: 0.3,
    },
    isSelected: {
      backgroundColor: 'red', //theme.selected,
    },
  });

  return (
    <TouchableOpacity
      ref={DropdownButton}
      style={styles.selectButton}
      onPress={toggleDropdown}
    >
      {renderDropdown()}
      <Text style={styles.buttonText}>{getLabel(selected)}</Text>
      <FontAwesome
        style={styles.icon}
        name='chevron-circle-down'
        size={24}
        color='black'
      />
    </TouchableOpacity>
  );
};

export default MasterSelect;
