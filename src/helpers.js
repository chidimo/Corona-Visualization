export const tsRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const monthShortNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const ordinalSuffix = (num) => {
  // 1st, 2nd, 3rd, 4th, etc.
  const j = num % 10;
  const k = num % 100;
  switch (true) {
  case j === 1 && k !== 11:
    return `${num}st`;
  case j === 2 && k !== 12:
    return `${num}nd`;
  case j === 3 && k !== 13:
    return `${num}rd`;
  default:
    return `${num}th`;
  }
};
