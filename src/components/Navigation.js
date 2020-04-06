import React from 'react';

import { Navbar, Nav } from 'react-bootstrap';

import { navigate } from '@reach/router';
import { NavLink } from './NavLink';

export const Navigation = () => {
  return (
    <>
      <Navbar
        bg="dark"
        expand="md"
        sticky="top"
        variant="dark"
        collapseOnSelect
        className="top-navigation"
      >
        <Navbar.Brand
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
        >
          Coronavirus charts
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavLink
              to="countries"
              className="nav-link"
              data-rb-event-key="countries"
            >
              Countries
            </NavLink>
            <NavLink
              to="distributions"
              className="nav-link"
              data-rb-event-key="countries"
            >
              Distributions
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};
