/** @format */

import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
//SCSS
import './MainMenu.scss';

function MainMenu() {
	const location = useLocation();
	const user = useSelector((state) => state.loginSettings);

	if (location.pathname != '/login') {
		// si l'utilisateur a le role 'admin' il a accès à son menu
		if (user.admin) {
			return (
				<Nav className='me-auto'>
					<Nav.Link className='hover-underline-animation' href='/'>
						Accueil
					</Nav.Link>
					<Nav.Link className='hover-underline-animation' href='/animals'>
						Liste Animaux
					</Nav.Link>
					<Nav.Link
						className='hover-underline-animation'
						href='/admin/create/card'
					>
						Création Animal
					</Nav.Link>
					<Nav.Link
						className='hover-underline-animation'
						href='/admin/create/user'
					>
						Création Bénévole
					</Nav.Link>
					<Nav.Link
						className='hover-underline-animation'
						href='/admin/users'
					>
						Liste Utilisateurs
					</Nav.Link>
				</Nav>
			);
		} else {
			// si l'utilisateur a le role 'user' il a accès à son menu
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
						Liste animaux
					</Nav.Link>
				</Nav>
			);
		}
	} else {
		return null;
	}
}

export default React.memo(MainMenu);
