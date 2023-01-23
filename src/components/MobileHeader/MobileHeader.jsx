import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from '../../assets/logo.svg';


//SCSS
import "./MobileHeader.scss";

//Icons from IcoMoon
import { ImUser, ImMenu } from "react-icons/im";

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
        <Col xs={3}>       
            <Navbar.Toggle aria-controls="responsive-navbar-nav" > <ImMenu /> </Navbar.Toggle>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="justify-content-end flex-grow-1 pe-3"></Nav>
            </Navbar.Collapse>
          </Col>
          <Col xs={6}>
            <Navbar.Brand href="#home"><img className="header-logo-mobile" src={logo} alt="Tout O Poils"/></Navbar.Brand>
          </Col>
          <Col className="icon-nav" xs={3}>
            <button className=" navbar-toggler collapsed" ><ImUser /></button>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default Header;