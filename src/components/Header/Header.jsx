import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/logo.svg';
import MainMenu from '../MainMenu/MainMenu';


//SCSS
import "./Header.scss";

function Header() {
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
      </Container>
    </Navbar>
  );
}

export default Header;