export const monthsObjects = [
  {
    id: 1,
    long: 'January',
    short: 'Jan',
  },
  {
    id: 2,
    long: 'February',
    short: 'Feb',
  },
  {
    id: 3,
    long: 'March',
    short: 'Mar',
  },
  {
    id: 4,
    long: 'April',
    short: 'Apr',
  },
  {
    id: 5,
    long: 'May',
    short: 'May',
  },
  {
    id: 6,
    long: 'June',
    short: 'Jun',
  },
  {
    id: 7,
    long: 'July',
    short: 'Jul',
  },
  {
    id: 8,
    long: 'August',
    short: 'Aug',
  },
  {
    id: 9,
    long: 'September',
    short: 'Sept',
  },
  {
    id: 10,
    long: 'October',
    short: 'Oct',
  },
  {
    id: 11,
    long: 'November',
    short: 'Nov',
  },
  {
    id: 12,
    long: 'December',
    short: 'Dec',
  },
];

export const daysObjects = [
  {
    id: 1,
    long: 'Sunday',
    short: 'Sun',
    tiny: 'Su',
  },
  {
    id: 2,
    long: 'Monday',
    short: 'Mon',
    tiny: 'Mo',
  },
  {
    id: 3,
    long: 'Tuesday',
    short: 'Tue',
    tiny: 'Tu',
  },
  {
    id: 4,
    long: 'Wednesday',
    short: 'Wed',
    tiny: 'We',
  },
  {
    id: 5,
    long: 'Thursday',
    short: 'Thu',
    tiny: 'Th',
  },
  {
    id: 6,
    long: 'Friday',
    short: 'Fri',
    tiny: 'Fr',
  },
  {
    id: 7,
    long: 'Saturday',
    short: 'Sat',
    tiny: 'Sa',
  },
];

export const fetchMonth = (dateRefStr, type) => {
  if (!dateRefStr) return monthsObjects[0];
  let monthNum = new Date(dateRefStr).getMonth() + 1;
  if (type === 'next') {
    monthNum = new Date(dateRefStr).getMonth() + 2;
  } else if (type === 'previous') {
    monthNum = new Date(dateRefStr).getMonth();
  }
  if (monthNum > 12) {
    monthNum = 1;
  } else if (monthNum < 1) {
    monthNum = 12;
  }
  const monthObject = monthsObjects.find((i) => i.id === monthNum);
  return monthObject;
};

export const toUTCDate = (dateStr) => {
  const dateArr = dateStr.split('-');
  const monthStr = dateArr[1];
  let month;
  if (isNaN(monthStr)) {
    const monthObj = monthsObjects.find((i) => i.short === monthStr);
    month = monthObj.id - 1;
  } else {
    month = Number(dateArr[1]) - 1;
  }
  const year = Number(dateArr[2]);
  const date = Number(dateArr[0]);

  const utcStr = Date.UTC(year, month, date);
  return utcStr;
};
