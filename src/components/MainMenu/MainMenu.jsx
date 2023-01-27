/** @format */

import React, { useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import { useLocation } from 'react-router-dom';

//SCSS
import './MainMenu.scss';

function MainMenu() {
	const location = useLocation();
	useEffect(() => {
		console.log(location);
	}, [location]);
	if (location.pathname != '/login') {
		return (
			<Nav className='me-auto'>
				<Nav.Link className='hover-underline-animation' href='/'>
					Accueil
				</Nav.Link>
				<Nav.Link className='hover-underline-animation' href='/walks'>
					Sortir un chien
				</Nav.Link>
				<Nav.Link className='hover-underline-animation' href='/visits'>
					Visiter la chatterie
				</Nav.Link>
				<Nav.Link className='hover-underline-animation' href='/animals'>
					Voir tous les animaux
				</Nav.Link>
			</Nav>
		);
	} else {
		return null;
	}
}

export default React.memo(MainMenu);
