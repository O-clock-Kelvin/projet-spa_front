/** @format */

import React from 'react';
import Nav from 'react-bootstrap/Nav';

//SCSS
import './MobileMainMenu.scss';

function MobileMainMenu() {
	return (
		<Nav className='me-auto'>
			<Nav.Link className='mobile-nav-link' href='/'>
				Accueil
			</Nav.Link>
			<Nav.Link className='mobile-nav-link' href='/walks'>
				Sortir un chien
			</Nav.Link>
			<Nav.Link className='mobile-nav-link' href='/visits'>
				Visiter la chatterie
			</Nav.Link>
			<Nav.Link className='mobile-nav-link' href='/animals'>
				Voir tous les animaux
			</Nav.Link>
		</Nav>
	);
}

export default React.memo(MobileMainMenu);
