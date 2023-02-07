/** @format */

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch } from "react-redux";

// Images
import logo from "../../assets/logo.svg";

//Custom Components
import MobileMainMenu from "../MobileMainMenu/MobileMainMenu";

//SCSS
import "./MobileHeader.scss";

//Icons from IcoMoon
import { ImUser, ImMenu } from "react-icons/im";
import { MdLogout } from "react-icons/md";
import { useLocation, Link } from "react-router-dom";
import { actionLogOut } from "../../actions/loginActions";

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const handleOnClick = () => {
    dispatch(actionLogOut());
    localStorage.removeItem("token");
  };
  return (
    <Navbar
      collapseOnSelect
      sticky='top'
      expand='lg'
      bg='light'
      variant='light'
    >
      <Container>
        <Row>
          <Col xs={3}>
            {location.pathname != "/login" ? (
              <>
                <Navbar.Toggle aria-controls='responsive-navbar-nav'>
                  {" "}
                  <ImMenu />{" "}
                </Navbar.Toggle>
                <Navbar.Collapse
                  className='mobile-nav'
                  id='responsive-navbar-nav'
                >
                  <MobileMainMenu />

                  <Navbar.Collapse className='justify-content-end'>
                    <Navbar.Text>
                      <span
                        onClick={handleOnClick}
                        role='button'
                        tabIndex={0}
                        className='disconnect-button'
                      >
									<MdLogout className="mobile-header-logout" /> Déconnexion
                      </span>
                    </Navbar.Text>
                  </Navbar.Collapse>
                </Navbar.Collapse>
              </>
            ) : null}
          </Col>

          <Col xs={6}>
            <Navbar.Brand href='/'>
              <img
                className='header-logo-mobile'
                src={logo}
                alt='Tout O Poils'
              />
            </Navbar.Brand>
          </Col>
          <Col className='icon-nav' xs={3}>
					{location.pathname != "/login" ? (
            <Link to='/profile'>
              <button className=' navbar-toggler collapsed'>
                <ImUser />
              </button>
            </Link>
						) : null}
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default Header;
