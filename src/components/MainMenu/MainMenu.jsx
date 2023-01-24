import React from 'react';
import Nav from 'react-bootstrap/Nav';

//SCSS
import "./MainMenu.scss";

function MainMenu() {
  return (
    <Nav className="me-auto">
        <Nav.Link className="hover-underline-animation" href="/">Accueil</Nav.Link>
        <Nav.Link className="hover-underline-animation" href="/walks">Sortir un chien</Nav.Link>
        <Nav.Link className="hover-underline-animation" href="/visits">Visiter la chatterie</Nav.Link>
        <Nav.Link className="hover-underline-animation" href="/animals">Voir tous les animaux</Nav.Link>
    </Nav>
  );
}

export default React.memo(MainMenu);