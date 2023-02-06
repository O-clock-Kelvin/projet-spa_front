import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Icon from '../../assets/icon.svg';

//SCSS
import './Footer.scss';
import { Link } from 'react-router-dom';

function Footer() {
	return (
		<Container className='footer' fluid>
			<div className='container'>
				<Row className='footer-row'>
					<Col sm={12} md={3} lg={2} className='align-self-center'>
						<Link to=''>Mentions Légales</Link>
					</Col>
					<Col sm={12} md={3} lg={2} className='align-self-center'>
						<Link to=''>Politique de confidentialité</Link>
					</Col>
					<Col sm={12} md={2} lg={4} className='align-self-center'>
						<div className='text-center'>
							<img className='footer-icon' src={Icon} alt='Tout O Poils' />
						</div>
					</Col>
					<Col sm={12} md={3} lg={4} className='align-self-center'>
						<p>Copyright - 2023</p>
					</Col>
				</Row>
			</div>
		</Container>
	);
}

export default React.memo(Footer);
