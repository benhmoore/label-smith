import React from 'react';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

interface AppMenuProps {
  onMenuClick: (menu: string) => void;
}

const AppMenu: React.FC<AppMenuProps> = ({ onMenuClick }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>Label Smith</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={() => onMenuClick('home')}>Home</Nav.Link>
          <Nav.Link onClick={() => onMenuClick('about')}>About</Nav.Link>
          <NavDropdown title="Settings" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={() => onMenuClick('one')}>
              One
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => onMenuClick('two')}>
              Two
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppMenu;
