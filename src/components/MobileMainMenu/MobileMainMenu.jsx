/** @format */

import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

//SCSS
import './MobileMainMenu.scss';

function MobileMainMenu() {
	const location = useLocation();
	const user = useSelector((state) => state.loginSettings);

	if (location.pathname != '/login') {
		// si l'utilisateur a le role 'admin' il a accès à son menu
		if (user.admin) {
			return (
				<Nav className='me-auto'>
					<Nav.Link className='mobile-nav-link' href='/'>
						Accueil
					</Nav.Link>
					<Nav.Link className='mobile-nav-link' href='/animals'>
						Voir tous les animaux
					</Nav.Link>
					<Nav.Link className='mobile-nav-link' href='/admin/create/card'>
						Création Animal
					</Nav.Link>
					<Nav.Link className='mobile-nav-link' href='/admin/create/user'>
						Création Bénévole
					</Nav.Link>
				</Nav>
			);
		} else {
			// si l'utilisateur a le role 'user' il a accès à son menu
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
	} else {
		return null;
	}
}

export default React.memo(MobileMainMenu);
