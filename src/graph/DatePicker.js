import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
// import toast from '../../toast';

const DatePicker = (props) => {
  const { dispatcher, dataObj } = props;

  if (dataObj.toDate === null) {
    // toast.info('Please use the date picker');
    dataObj.toDate = moment();
  }
  if (dataObj.fromDate === null) {
    // toast.info('Please use the date picker');
    dataObj.fromDate = moment().subtract(30, 'days');
  }

  return (
    <DateRangePicker
      endDateId="toDate"
      startDateId="fromDate"
      endDate={dataObj.toDate}
      startDate={dataObj.fromDate}
      displayFormat={() => 'MMM DD, YYYY'}
      onDatesChange={({ startDate, endDate }) => {
        dispatcher({ type: 'SET_TO_DATE', toDate: endDate });
        dispatcher({ type: 'SET_FROM_DATE', fromDate: startDate });
      }}
      focusedInput={dataObj.focusedInput}
      onFocusChange={(focusedInput) => {
        dispatcher({ type: 'SET_FOCUSED_INPUT', focusedInput });
      }}
      isOutsideRange={() => false}
    />
  );
};

DatePicker.propTypes = {
  dataObj: PropTypes.object,
  dispatcher: PropTypes.func,
};

export default DatePicker;
