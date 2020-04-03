import React from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from './NavLink';

export const Navigation = () => {
  return (
    <Navbar collapseOnSelect expand="md" fixed="top" bg="dark" variant="dark">
      <Navbar.Brand href="/">Coronavirus charts</Navbar.Brand>
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
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
