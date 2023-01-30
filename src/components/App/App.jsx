/** @format */

import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// composants
import Header from '../Header/Header';
import MobileHeader from '../MobileHeader/MobileHeader';
import LoginForm from '../LoginForm/LoginForm';
import Home from '../Home/Home';
import Dashboard from '../Dashboard/Dashboard';
import DashboardVolunteerCreation from '../DashboardVolunteerCreation/DashboardVolunteerCreation';
import PrivateRoutes from '../PrivateRoutes/PrivateRoutes';
import PrivateRoutesAdmin from '../PrivateRoutesAdmin/PrivateRoutesAdmin';
import Error404 from '../Error404/Error404';
import WalkingDog from '../WalkingDog/WalkingDog';
import VisitsCats from '../VisitsCats/VisitsCats';
import Footer from '../Footer/Footer';

// fonctions
import { useSelector } from 'react-redux';
import { actionSetToken, actionTokenChecked } from '../../actions/tokenAction';

import './styles.scss';

import { useDispatch } from 'react-redux';
import ProfilePage from '../Profile';
import ListAnimals from '../ListAnimals/ListAnimals';

function App() {
	const { isConnected, admin, token, authLoaded } = useSelector(
		(fullstate) => fullstate.loginSettings
	);

	const dispatch = useDispatch();

	useEffect(() => {
		try {
			// on vérifie si on a un token déjà présent dans le localstorage
			const tokenFromLocalStorage = localStorage.getItem('token');

			// si oui on l'envoie au state de redux
			if (tokenFromLocalStorage) {
				const parsedToken = JSON.parse(tokenFromLocalStorage);
				dispatch(actionSetToken(parsedToken));
				dispatch(actionTokenChecked());
			} else {
				dispatch(actionTokenChecked());
			}
		} catch (err) {
			console.log(err);
		}
	}, []);

	useEffect(() => {
		// à chaque changement du token du state de redux, on le modifie dans le localstorage
		if (token) {
			const stringifiedToken = JSON.stringify(token);
			localStorage.setItem('token', stringifiedToken);
		}
	}, [token]);

	if (authLoaded) {
		return (
			<div className='app'>
				<div className='menu'>
					<div className='menu-desktop'>
						<Header />
					</div>
					<div className='menu-mobile'>
						<MobileHeader />
					</div>
				</div>
				<Routes>
					{/* pages accessibles à l'utilisateur connecté */}
					<Route element={<PrivateRoutes />}>
						<Route path='/home' element={<Home />} />
						<Route path='/walks' element={<WalkingDog />} />
						<Route path='/visits' element={<VisitsCats />} />
						<Route path='/animals' element={<ListAnimals />} />
					</Route>

					{/* pages accessibles à l'admin connecté */}
					<Route element={<PrivateRoutesAdmin />}>
						<Route path='/admin' element={<Dashboard />} />
						<Route
							path='/admin/create/user'
							element={<DashboardVolunteerCreation />}
						/>
					</Route>

					<Route
						path='/profile'
						element={
							isConnected ? <ProfilePage /> : <Navigate to='/login' replace />
						}
					/>

					<Route
						path='/'
						element={
							isConnected && !admin ? (
								<Navigate to='/home' replace />
							) : isConnected && admin ? (
								<Navigate to='/admin' replace />
							) : (
								<Navigate to='/login' replace />
							)
						}
					/>
					<Route
						path='/login'
						element={isConnected ? <Navigate to='/' replace /> : <LoginForm />}
					/>
					<Route path='*' element={<Error404 />} />
				</Routes>
				<Footer />
			</div>
		);
	} else {
		//@TODO
		return <p>Loading</p>;
	}
}

App.propTypes = {};

export default React.memo(App);
