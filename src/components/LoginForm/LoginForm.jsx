/** @format */

import React, { useState } from 'react';
import Reaptcha from 'reaptcha';
// composants
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import WrongAuthentification from '../WrongAuthentification/WrongAuthentification';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';

// fonctions
import { useDispatch, useSelector } from 'react-redux';
import { actionLoginFetch } from '../../actions/loginActions';

//SCSS
import './LoginForm.scss';

//Images
import manWalkingDog from '../../assets/images/clipart1525964.png';

//Icons from IcoMoon
import { ImUser, ImLock } from 'react-icons/im';

function LoginForm() {
	// utilisation du state pour variables utiles dans le composant
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [captchaVerified, setCaptchaVerified] = useState(false);

	// utilisation de la fonction dispatch de redux pour lancer une action
	const dispatch = useDispatch();

	const { isLoading, noAutorisation } = useSelector(
		(fullstate) => fullstate.loginSettings
	);

	// on modifie et enregistre la valeur de l'email dans le state
	const handleOnChangeEmail = (event) => {
		setEmail(event.target.value);
	};

	const handleOnChangePassword = (event) => {
		setPassword(event.target.value);
	};

	// au submit on envoie l'email et le password à actionLoginFetch
	const handleOnSubmit = (event) => {
		event.preventDefault();
		if (!email.trim() || !password.trim()) {
			return;
		}
		dispatch(actionLoginFetch({ email: email.trim(), password }));
		setEmail('');
		setPassword('');
	};

	const onCaptchaVerify = () => {
		setCaptchaVerified(true);
	};
	return (
		<>
			<div className='login'>
				<h2 className='login-title'>
					Application de gestion des actions de bénévolats
				</h2>
				<Container className='login-container'>
					<div className='login-container-elements'>
						<img
							className='login-container-img'
							src={manWalkingDog}
							alt='Bénévole balade un chien'
						/>

						<h2 className='login-title-mobile'>
							Application de gestion des actions de bénévolats
						</h2>
						<Form className='login-form' onSubmit={handleOnSubmit}>
							<div className='login-form-elements'>
								<Form.Group className='mb-3' controlId='formBasicEmail'>
									<InputGroup>
										<InputGroup.Text>
											<ImUser />
										</InputGroup.Text>

										<Form.Control
											type='email'
											placeholder='Email'
											value={email}
											onChange={handleOnChangeEmail}
										/>
									</InputGroup>
								</Form.Group>

								<Form.Group className='mb-3' controlId='formBasicPassword'>
									<InputGroup>
										<InputGroup.Text>
											<ImLock />
										</InputGroup.Text>
										<Form.Control
											type='password'
											placeholder='Mot de passe'
											value={password}
											onChange={handleOnChangePassword}
										/>
									</InputGroup>

									{!captchaVerified ? (
										<div
											style={{
												display: 'flex',
												justifyContent: 'center',
												marginTop: '10px',
												marginBottom: '10px',
											}}
										>
											<Reaptcha
												sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
												onVerify={onCaptchaVerify}
											/>
										</div>
									) : null}
								</Form.Group>
								{isLoading ? (
									<LoadingSpinner />
								) : (
									<Button
										variant='primary'
										type='submit'
										disabled={!captchaVerified}
									>
										Se Connecter
									</Button>
								)}
							</div>
						</Form>
						{noAutorisation && <WrongAuthentification />}
					</div>
				</Container>
			</div>
		</>
	);
}

LoginForm.propTypes = {};

export default React.memo(LoginForm);
