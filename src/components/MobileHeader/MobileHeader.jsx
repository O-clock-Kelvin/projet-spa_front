import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from '../../assets/logo.svg';


//SCSS
import "./MobileHeader.scss";

//Icons from IcoMoon
import { ImUser } from "react-icons/im";

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
        <Row>
        <Col xs={2}>       
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="justify-content-end flex-grow-1 pe-3"></Nav>
            </Navbar.Collapse>
          </Col>
          <Col xs={8}>
            <Navbar.Brand href="#home"><img className="header-logo-mobile" src={logo} alt="Tout O Poils"/></Navbar.Brand>
          </Col>
          <Col xs={2}>
            <ImUser />
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default Header;