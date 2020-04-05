/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import { ISOStringWithDash, todayISOStringWithDash } from '../dateUtils';

export const DatePicker = (props) => {
  const { data, dispatch } = props;

  const refs = { toRef: null, fromRef: null };

  return (
    <Container className="country-page-date-selector">
      <InputGroup className="">
        <InputGroup.Prepend expand="sm">
          <InputGroup.Text>Select date range</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          as={'input'}
          type={'date'}
          id="fromDate"
          ref={(node) => (refs.fromRef = node)}
          min={ISOStringWithDash('2019-09-01')}
          value={ISOStringWithDash(data.fromDate)}
          onChange={(e) => {
            dispatch({ type: 'SET_FROM_DATE', fromDate: e.target.value });
            refs.toRef.focus();
          }}
        />
        <FormControl
          id="toDate"
          as={'input'}
          type={'date'}
          max={todayISOStringWithDash()}
          ref={(node) => (refs.toRef = node)}
          value={ISOStringWithDash(data.toDate)}
          onChange={(e) => {
            dispatch({ type: 'SET_TO_DATE', toDate: e.target.value });
          }}
        />
      </InputGroup>
    </Container>
  );
};

DatePicker.propTypes = {
  data: PropTypes.object,
  dispatch: PropTypes.func,
};
