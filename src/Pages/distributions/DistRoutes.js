import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import {
  getCountryById,
  cleanGetCountry,
  getCountryByName,
} from '../countries/redux/countActions';

export const DistRoutes = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    getCountryByName('World')(dispatch).then((data) => {
      const { success, _id } = data;
      if (success) {
        getCountryById(_id)(dispatch);
      }
    });
    return () => {
      cleanGetCountry()(dispatch);
    };
  }, [ dispatch ]);

  return <div>{children}</div>;
};

DistRoutes.propTypes = {
  children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
};
