import { tsRegex, monthNames, monthShortNames, ordinalSuffix } from './helpers';

export const timeStampIsValid = (timeStamp) => {
  if (!timeStamp) return false;
  if (!timeStamp.match(tsRegex)) return false;
  return true;
};

export const localeFromTSOrdinal = (timeStamp) => {
  // 15th January 2020
  if (!timeStamp) return 'Unknown date';
  if (!timeStamp.match(tsRegex)) return 'Invalid timestamp';
  const d = new Date(timeStamp);
  const date = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();
  return `${ordinalSuffix(date)} ${monthNames[month]} ${year}`;
};

export const formCompositeTime = (timeStamp) => {
  if (!timeStamp) return 'Unknown date';
  const spl = timeStamp.split('T');
  const date = spl[0];
  const time = spl[1].split('Z')[0];
  return new Date(`${date} ${time}`);
};

export const compositeTimeFromTS = (timeStamp) => {
  if (!timeStamp) return 'Unknown date';
  if (!timeStamp.match(tsRegex)) return 'Invalid timestamp';
  const spl = timeStamp.split('T');
  const date = spl[0];
  const time = spl[1].split('Z')[0];
  return new Date(`${date} ${time}`).getTime();
};

export const localeFromTSFull = (timeStamp) => {
  if (!timeStamp) return 'Unknown date';
  if (!timeStamp.match(tsRegex)) return 'Invalid timestamp';
  // Sunday, 8 November 2020 at 01:00
  return new Date(timeStamp).toLocaleString('en-GB', {
    dateStyle: 'full',
    timeStyle: 'short',
  });
};

export const localeFromTS = (timeStamp) => {
  if (!timeStamp) return 'Unknown date';
  if (!timeStamp.match(tsRegex)) return 'Invalid timestamp';
  // Friday, 8 November 2019
  return new Date(timeStamp).toLocaleString('en-GB', {
    dateStyle: 'full',
  });
};

export const localeFromTSToDMY = (timeStamp) => {
  if (!timeStamp) return 'Unknown date';
  // 30/11/2019, 8:00 PM
  // 15/10/2019, 12:36 PM
  const options = {
    hour12: true,
    day: 'numeric',
    hour: 'numeric',
    year: 'numeric',
    month: 'numeric',
    minute: 'numeric',
  };
  return (
    new Date(timeStamp)
      .toLocaleString('en-GB', options)
      .replace(/0:/, '12:') // format 12 o clock
      // .replace(/,/, ' at')
      .replace(/am/, 'AM')
      .replace(/pm/, 'PM')
  );
};

export const localeFromTSShort = (timeStamp) => {
  if (!timeStamp) return 'Unknown date';
  if (!timeStamp.match(tsRegex)) return 'Invalid timestamp';
  // December 6th, 2019
  const d = new Date(timeStamp);
  const date = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();
  return `${monthNames[month]} ${ordinalSuffix(date)}, ${year}`;
};

export const localeFromTSMonthShort = (timeStamp) => {
  if (!timeStamp) return 'Unknown date';
  if (!timeStamp.match(tsRegex)) return 'Invalid timestamp';
  // Dec 6th, 2019
  const d = new Date(timeStamp);
  const date = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();
  return `${monthShortNames[month]}-${ordinalSuffix(date)}-${year}`;
};

export const localeFromTSUTC = (timeStamp) => {
  if (!timeStamp) return 'Unknown date';
  if (!timeStamp.match(tsRegex)) return 'Invalid timestamp';
  // Friday, 8 November 2019 at 16:44
  return new Date(timeStamp).toLocaleString('en-GB', {
    // timeZone: 'UTC',
    dateStyle: 'full',
    timeStyle: 'short',
  });
};

export const todayISOStringWithDash = () =>
  new Date().toISOString().split('T')[0].replace(/\//g, '-');

export const todayPlusNDays = (n, asISO = false) => {
  // add n days to today and returns an ISO or object
  let future = new Date();
  future = future.setDate(future.getDate() + n);
  if (asISO) {
    return new Date(future).toISOString().split('T')[0].replace(/\//g, '-');
  }
  return new Date(future);
};

export const todayMinusNDays = (n, asISO = false) => {
  // remove n days from today and returns an ISO or object
  let past = new Date();
  past = past.setDate(past.getDate() - n);
  if (asISO) {
    return new Date(past).toISOString().split('T')[0].replace(/\//g, '-');
  }
  return new Date(past);
};

export const timePlusNHoursISO = (date, n) => {
  const time = new Date(date);
  const extended = time.setHours(time.getHours() + n);

  return new Date(extended).toISOString().split('T')[1].split('Z')[0];
};

export const ISOStringWithDash = (timeStamp) => {
  // "2020-03-05"}
  if (!timeStamp) return 'Unknown date';
  return new Date(timeStamp).toISOString().split('T')[0].replace(/\//g, '-');
};

export const ISOStringWithDashFull = (timeStamp) => {
  // "2020-03-05"}
  if (!timeStamp) return 'Unknown date';
  return new Date(timeStamp).toISOString();
};
