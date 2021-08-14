import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link to="/" className="navbar-brand">
            HOME
          </Link>
          <Nav className="me-auto">
            <Link to="/joinForm" className="nav-link">
              JOIN
            </Link>
            <Link to="/loginForm" className="nav-link">
              LOGIN
            </Link>
            <Link to="/saveForm" className="nav-link">
              WRTITE
            </Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
};

export default Header;
