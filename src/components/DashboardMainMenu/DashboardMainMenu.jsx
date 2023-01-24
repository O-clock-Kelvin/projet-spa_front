import React from 'react';
import Nav from 'react-bootstrap/Nav';

//SCSS
import "./DashboardMainMenu.scss";

function DashboardMainMenu() {
  return (
    <Nav className="me-auto">
        <Nav.Link className="hover-underline-animation" href="/">Accueil</Nav.Link>
        <Nav.Link className="hover-underline-animation" href="/walks">Voir tous les animaux</Nav.Link>
        <Nav.Link className="hover-underline-animation" href="/visits">Création Animal</Nav.Link>
        <Nav.Link className="hover-underline-animation" href="/animals">Création Bénévole</Nav.Link>
    </Nav>
  );
}

export default React.memo(DashboardMainMenu);