import React, { useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import { SideNavLinks } from './SideNavLinks';
import { BorderSpinner } from './Spinners';
import { filterCountRed } from './reducers';
import { getCountries } from './countries/redux/countActions';

const SidebarLeft = () => {
  const dispatch = useDispatch();
  const { countries, gettingCountries } = useSelector((state) => state.cont);

  const [ info, infoDispatch ] = useReducer(filterCountRed, {});

  useEffect(() => {
    infoDispatch({
      type: 'POPULATE_COUNTRIES',
      displayCountries: countries,
    });
  }, [ countries ]);

  useEffect(() => {
    getCountries()(dispatch);
  }, [ dispatch ]);

  const filterCountries = (query) => {
    if (!query) {
      infoDispatch({
        type: 'FILTER_COUNTRIES',
        displayCountries: countries,
      });
    } else {
      infoDispatch({
        type: 'FILTER_COUNTRIES',
        displayCountries: countries.filter((c) =>
          c.name.toLowerCase().includes(query.toLowerCase())
        ),
      });
    }
  };

  return (
    <Container className="left-sidebar sidebar">
      <InputGroup className="py-3 countries-searchbox">
        <FormControl
          onChange={(e) => {
            filterCountries(e.target.value);
          }}
          placeholder="Search"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
      </InputGroup>

      {gettingCountries ? (
        <BorderSpinner />
      ) : (
        <Container className="countries-list">
          {info.displayCountries.map((c) => {
            const { _id, name, short_name } = c;
            return (
              <div className="nav-item card mb-2" key={_id}>
                <div className="flag-container">
                  <img
                    src={`https://www.countryflags.io/${short_name}/shiny/32.png`}
                    alt="Flag"
                  />
                </div>
                <SideNavLinks to={`countries/${_id}`}>{name}</SideNavLinks>
              </div>
            );
          })}
        </Container>
      )}
    </Container>
  );
};

export default SidebarLeft;
