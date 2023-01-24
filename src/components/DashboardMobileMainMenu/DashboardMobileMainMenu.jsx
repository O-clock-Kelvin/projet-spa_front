import React from 'react';
import Nav from 'react-bootstrap/Nav';

//SCSS
import "./DashboardMobileMainMenu.scss";

function DashboardMobileMainMenu() {
  return (
    <Nav className="me-auto">
        <Nav.Link className="mobile-nav-link" href="/">Accueil</Nav.Link>
        <Nav.Link className="mobile-nav-link" href="/walks">Voir tous les animaux</Nav.Link>
        <Nav.Link className="mobile-nav-link" href="/visits">Création Animal</Nav.Link>
        <Nav.Link className="mobile-nav-link" href="/animals">Création Bénévole</Nav.Link>
    </Nav>
  );
}

export default React.memo(DashboardMobileMainMenu);