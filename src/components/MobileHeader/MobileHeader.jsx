// /** @format */

// import Container from "react-bootstrap/Container";
// import Navbar from "react-bootstrap/Navbar";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import { useDispatch } from "react-redux";

// // Images
// import logo from "../../assets/logo.svg";

// //Custom Components
// import MobileMainMenu from "../MobileMainMenu/MobileMainMenu";

// //SCSS
// import "./MobileHeader.scss";

// //Icons from IcoMoon
// import { ImUser, ImMenu } from "react-icons/im";
// import { MdLogout } from "react-icons/md";
// import { useLocation, Link } from "react-router-dom";
// import { actionLogOut } from "../../actions/loginActions";

// const Header = () => {
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const handleOnClick = () => {
//     dispatch(actionLogOut());
//     localStorage.removeItem("token");
//   };
//   return (
//     <Navbar
//       collapseOnSelect
//       sticky='top'
//       expand='lg'
//       bg='light'
//       variant='light'
//     >
//       <Container>
//         <Row>
//           <Col xs={3}>
//             {location.pathname != "/login" ? (
//               <>
//                 <Navbar.Toggle aria-controls='responsive-navbar-nav'>
//                   {" "}
//                   <ImMenu />{" "}
//                 </Navbar.Toggle>
//                 <Navbar.Collapse
//                   className='mobile-nav'
//                   id='responsive-navbar-nav'
//                 >
//                   <MobileMainMenu />

//                   <Navbar.Collapse className='justify-content-end'>
//                     <Navbar.Text>
//                       <span
//                         onClick={handleOnClick}
//                         role='button'
//                         tabIndex={0}
//                         className='disconnect-button'
//                       >
//                         <MdLogout className="mobile-header-logout" /> Déconnexion
//                       </span>
//                     </Navbar.Text>
//                   </Navbar.Collapse>
//                 </Navbar.Collapse>
//               </>
//             ) : null}
//           </Col>

//           <Col xs={6}>
//             <Navbar.Brand href='/'>
//               <img
//                 className='header-logo-mobile'
//                 src={logo}
//                 alt='Tout O Poils'
//               />
//             </Navbar.Brand>
//           </Col>
//           <Col className='icon-nav' xs={3}>
//             {location.pathname != "/login" ? (
//               <Link to='/profile'>
//                 <button className=' navbar-toggler collapsed'>
//                   <ImUser />
//                 </button>
//               </Link>
//             ) : null}
//           </Col>
//         </Row>
//       </Container>
//     </Navbar>
//   );
// };

// export default Header;

import React, { useState } from "react";
import { Container, Offcanvas, Navbar, Nav } from "react-bootstrap";
import MobileMainMenu from "../MobileMainMenu/MobileMainMenu";
import { useLocation, Link } from "react-router-dom";

import { ImUser } from "react-icons/im";
import logo from "../../assets/logo.svg";

import "./MobileHeader.scss";

const Header = () => {
  const location = useLocation();
  const [show, setShow] = useState(false);
  // const offsetValue = -56;

  const toggleOffCanvas = () => {
    setShow((show) => !show);
  };

  return (
    <>
      <Navbar bg="light" variant="light" expand={false} fixed="top">

        <Container className="mobile-header-container">
          {location.pathname != "/login" ? (
            <>
              <Navbar.Toggle
                aria-controls="offcanvasNavbar"
                onClick={toggleOffCanvas}
                className='mobile-nav'
              />
            </>
          ) : null}

          <Navbar.Brand className='header-logo-mobile' href='/'>
            <img
              src={logo}
              alt='Tout O Poils'
            />
          </Navbar.Brand>

          {location.pathname != "/login" ? (
            
            <Link to='/profile'>
              <button className=' navbar-toggler collapsed'>
                <ImUser />
              </button>
            </Link>
          ) : null}

        </Container>
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          show={show}
          onHide={toggleOffCanvas}
        >
          <Offcanvas.Header closeButton>
            <Navbar.Brand className='header-logo-mobile' href='/'>
              <img
                src={logo}
                alt='Tout O Poils'
              />
            </Navbar.Brand>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3 offcanvas--menu">
              <MobileMainMenu/>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
          

      </Navbar>
    </>
  );
};

export default Header;
