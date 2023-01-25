import React from 'react';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/logo.svg';
import MainMenu from '../MainMenu/MainMenu';

//SCSS
import "./Header.scss";

//Icons from IcoMoon
import { ImUser } from "react-icons/im";
import { useDispatch } from 'react-redux';

// fonctions
import { actionLogOut } from '../../actions/loginActions';

function Header() {

  const dispatch = useDispatch();

  const handleOnClick = () => {
    console.log("clik deconnexion");
    dispatch(actionLogOut());
  };

  return (
    <Navbar
      collapseOnSelect
      sticky="top"
      expand="lg"
      bg="light"
      variant="light"
    >
      <Container>
        <Navbar.Brand href="/"><img className="header-logo" src={logo} alt="Tout O Poils"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <MainMenu/>
        </Navbar.Collapse>

        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <a
              href="#login"
              onClick={handleOnClick}
            >
              Déconnexion
            </a>
          </Navbar.Text>
          <button className="icon-user" ><ImUser /></button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default React.memo(Header);