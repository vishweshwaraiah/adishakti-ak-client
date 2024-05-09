import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Entypo, Feather } from '@expo/vector-icons';
import { daysObjects, fetchMonth, toUTCDate } from '@/utils/DateTime';
import CalendarGrid from '@/components/CalendarGrid';
import MasterModal from '@/components/Modals/MasterModal';
import Colors from '@/utils/Colors';
import MasterButton from '@/components/MasterButton';
import Sizes from '@/utils/Sizes';

const MasterPicker = (props) => {
  const {
    inputDefDate,
    onSelect = () => {},
    onCancel = () => {},
    modalStatus = 'close',
  } = props;

  const [visibleDays, setVisibleDays] = useState([]);
  const [dateRef, setDateRef] = useState(new Date());
  const [defaultSel, setDefaultSel] = useState(new Date());
  const [stringDate, setStringDate] = useState('');
  const [modalOpen, setModalOpen] = useState('close');

  const handleCancel = () => {
    setModalOpen('close');
    onCancel();
  };

  const handleSubmit = () => {
    setModalOpen('close');
    onSelect(dateRef);
  };

  const getDayShortStr = (date) => {
    const utcStr = toUTCDate(date);
    const shortDay = new Date(utcStr).toLocaleString('default', {
      weekday: 'short',
    });
    return shortDay;
  };

  const processCalendar = (dateObj) => {
    setVisibleDays([]);
    const calendarData = [];

    const monthObj = fetchMonth(dateObj, 'current');
    const monthStr = monthObj?.short;
    const selectedMonth = monthStr;
    const selectedYear = dateObj.getFullYear();

    setStringDate(dateObj.toDateString());

    dateObj.setDate(1);

    const lastDay = new Date(
      dateObj.getFullYear(),
      dateObj.getMonth() + 1,
      0
    ).getDate();

    const prevLastDay = new Date(
      dateObj.getFullYear(),
      dateObj.getMonth(),
      0
    ).getDate();

    const firstDayIndex = dateObj.getDay();

    const lastDayIndex = new Date(
      dateObj.getFullYear(),
      dateObj.getMonth() + 1,
      0
    ).getDay();

    const nextDays = 7 - lastDayIndex - 1;

    for (let x = firstDayIndex; x > 0; x--) {
      calendarData.push({
        type: 'prev-date',
        date: prevLastDay - x + 1,
        month: fetchMonth(dateObj, 'previous').id,
        id: `prev-date-${prevLastDay - x + 1}`,
      });
    }

    for (let i = 1; i <= lastDay; i++) {
      if (
        i === defaultSel?.getDate() &&
        defaultSel?.getMonth() === dateObj.getMonth() &&
        defaultSel?.getFullYear() === dateObj.getFullYear()
      ) {
        calendarData.push({
          type: 'selected-date',
          date: i,
          month: selectedMonth,
          id: `selected-date-${i}`,
          shortDay: getDayShortStr(`${i}-${selectedMonth}-${selectedYear}`),
          fullDate: `${i}-${selectedMonth}-${selectedYear}`,
        });
      } else if (
        i === new Date().getDate() &&
        dateObj.getMonth() === new Date().getMonth() &&
        dateObj.getFullYear() === new Date().getFullYear()
      ) {
        calendarData.push({
          type: 'current-date',
          date: i,
          month: selectedMonth,
          id: `current-date-${i}`,
          shortDay: getDayShortStr(`${i}-${selectedMonth}-${selectedYear}`),
          fullDate: `${i}-${selectedMonth}-${selectedYear}`,
        });
      } else {
        calendarData.push({
          type: 'month-date',
          date: i,
          month: selectedMonth,
          id: `month-date-${i}`,
          shortDay: getDayShortStr(`${i}-${selectedMonth}-${selectedYear}`),
          fullDate: `${i}-${selectedMonth}-${selectedYear}`,
        });
      }
    }

    for (let j = 1; j <= nextDays; j++) {
      calendarData.push({
        type: 'next-date',
        date: j,
        month: fetchMonth(dateObj, 'next').id,
        id: `next-date-${j}`,
      });
    }

    setVisibleDays(calendarData);
  };

  const prevMonth = () => {
    const dateObj = new Date(dateRef);
    const prevMonthNum = dateObj.getMonth() - 1;
    dateObj.setMonth(prevMonthNum);
    setDefaultSel(dateObj);
    setDateRef(new Date(dateObj));
  };

  const nextMonth = () => {
    const dateObj = new Date(dateRef);
    const nextMonthNum = dateObj.getMonth() + 1;
    dateObj.setMonth(nextMonthNum);
    setDefaultSel(dateObj);
    setDateRef(new Date(dateObj));
  };

  const prevYear = () => {
    const dateObj = new Date(dateRef);
    const prevYearNum = dateObj.getFullYear() - 1;
    dateObj.setYear(prevYearNum);
    setDefaultSel(dateObj);
    setDateRef(new Date(dateObj));
  };

  const nextYear = () => {
    const dateObj = new Date(dateRef);
    const nextYearNum = dateObj.getFullYear() + 1;
    dateObj.setYear(nextYearNum);
    setDefaultSel(dateObj);
    setDateRef(new Date(dateObj));
  };

  const handleSelect = (item) => {
    const utcStr = toUTCDate(item.fullDate);
    setDefaultSel(new Date(utcStr));
    setDateRef(new Date(utcStr));
  };

  useEffect(() => {
    if (modalStatus === 'open') {
      setModalOpen('open');
    } else {
      setModalOpen('close');
    }
  }, [modalStatus]);

  useEffect(() => {
    if (dateRef) {
      const dateObj = new Date(dateRef);
      processCalendar(dateObj);
    }
  }, [dateRef]);

  useEffect(() => {
    if (inputDefDate) {
      const defDate = new Date(inputDefDate);
      setDateRef(defDate);
      setDefaultSel(defDate);
    }
  }, [inputDefDate]);

  useEffect(() => {
    processCalendar(new Date());
  }, []);

  return (
    <MasterModal
      bodyHeight={400}
      bodyWidth='80%'
      bgColor={Colors.$modalBodyBg}
      status={modalOpen}
      setStatus={setModalOpen}
      isClosable={false}
    >
      <View style={styles.masterCalendar}>
        <View style={styles.pickerView}>
          <View style={styles.actionsBox}>
            <TouchableOpacity onPress={prevYear}>
              <Feather name='chevrons-left' size={30} color='black' />
            </TouchableOpacity>
            <TouchableOpacity onPress={prevMonth}>
              <Entypo name='chevron-left' size={24} color='black' />
            </TouchableOpacity>
            <Text>{stringDate}</Text>
            <TouchableOpacity onPress={nextMonth}>
              <Entypo name='chevron-right' size={24} color='black' />
            </TouchableOpacity>
            <TouchableOpacity onPress={nextYear}>
              <Feather name='chevrons-right' size={30} color='black' />
            </TouchableOpacity>
          </View>
          <View style={styles.datesView}>
            <CalendarGrid
              gridData={visibleDays}
              headerData={daysObjects}
              dataValueKey='date'
              headerValueKey='tiny'
              listKeyId='id'
              columns={7}
              onClick={handleSelect}
            />
          </View>
          <View style={styles.groupActions}>
            <MasterButton
              onPress={handleCancel}
              title='Cancel'
              variant='light'
              textColor='black'
              marginTop={Sizes.$ieXLargeMargin}
            ></MasterButton>
            <MasterButton
              onPress={handleSubmit}
              title='Select'
              variant='secondary'
              textColor='white'
              marginTop={Sizes.$ieXLargeMargin}
            ></MasterButton>
          </View>
        </View>
      </View>
    </MasterModal>
  );
};

export default MasterPicker;

const styles = StyleSheet.create({
  masterCalendar: {
    position: 'relative',
    alignItems: 'center',
    paddingHorizontal: Sizes.$ieRegularPadding,
  },
  actionsBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Sizes.$ieRegularPadding,
  },
  datesView: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: Sizes.$ieRegularMargin,
  },
  groupActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
});
