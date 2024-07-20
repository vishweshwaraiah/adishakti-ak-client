import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
} from 'react-native';
import Sizes from '@/utils/Sizes';
import useMasterStyle from '@/utils/useMasterStyle';
import { useTheme } from '@/themes/ThemeProvider';
import MasterIcon from '@/components/MasterIcon';

const MasterSelect = (props) => {
  const { selectData, onSelect, currentValue } = props;

  const { theme } = useTheme();
  const mStyles = useMasterStyle();

  const DropdownButton = useRef();

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(undefined);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [selectOpts, setSelectOpts] = useState(selectData);

  const toggleDropdown = () => {
    return visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = () => {
    DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h + 2);
    });
    setVisible(true);
  };

  const updateOptsList = (entry) => {
    const updated = selectData.map((i) => {
      if (i.value === entry.value) {
        i.selected = true;
      } else {
        i.selected = false;
      }
      return i;
    });
    setSelectOpts(updated);
  };

  const onItemPress = (item) => {
    updateOptsList(item);
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  useEffect(() => {
    let foundItem = selectData.find((x) => x.selected);

    if (currentValue) {
      foundItem = selectData.find((x) => x.value === currentValue);
      updateOptsList(foundItem);
    }

    setSelected(foundItem);
  }, [currentValue]);

  const styles = StyleSheet.create({
    selectButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.itemBg,
      height: Sizes.$ieLargeHeight,
      borderRadius: Sizes.$ieRegularRadius,
      zIndex: 201,
      ...mStyles.commonShadow,
    },
    buttonText: {
      flex: 1,
      textAlign: 'left',
      marginLeft: Sizes.$ieRegularMargin,
      color: theme.itemColor,
    },
    iconSpace: {
      marginRight: Sizes.$ieRegularMargin,
    },
    selectDropdown: {
      position: 'absolute',
      backgroundColor: theme.itemBg,
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
    selectText: {
      color: theme.itemColor,
    },
    isSelected: {
      backgroundColor: theme.itemSelected,
      borderRadius: Sizes.$ieRegularRadius,
    },
  });

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[styles.selectOption, item.selected && styles.isSelected]}
        onPress={() => onItemPress(item)}
      >
        <Text style={styles.selectText}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  const renderDropdown = () => {
    return (
      <Modal visible={visible} transparent animationType='fade'>
        <TouchableOpacity style={styles.selectOverlay} onPress={toggleDropdown}>
          <View style={[styles.selectDropdown, { top: dropdownTop }]}>
            <FlatList
              data={selectOpts}
              renderItem={renderItem}
              keyExtractor={(item) => item.value.toString()}
              style={styles.dropdownList}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <TouchableOpacity
      ref={DropdownButton}
      style={styles.selectButton}
      onPress={toggleDropdown}
    >
      <Text style={styles.buttonText}>{selected?.label}</Text>
      <MasterIcon
        iconName='chevron-circle-down'
        iconSize={24}
        iconColor={theme.itemColor}
        iconFamily='FontAwesome'
        iconStyles={styles.iconSpace}
      />
      {renderDropdown()}
    </TouchableOpacity>
  );
};

export default MasterSelect;
