/** @format */

import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// composants
import Header from '../Header/Header';
import MobileHeader from '../MobileHeader/MobileHeader';
import LoginForm from '../../pages/LoginForm/LoginForm';
import Home from '../../pages/Home/Home';
import Dashboard from '../../pages/Dashboard/Dashboard';
import DashboardVolunteerCreation from '../../pages/DashboardVolunteerCreation/DashboardVolunteerCreation';
import DashboardAnimalCreation from '../../pages/DashboardAnimalCreation/DashboardAnimalCreation';
import PrivateRoutes from '../PrivateRoutes/PrivateRoutes';
import PrivateRoutesAdmin from '../PrivateRoutesAdmin/PrivateRoutesAdmin';
import Error404 from '../../pages/Error404/Error404';
import WalkingDog from '../../pages/WalkingDog/WalkingDog';
import VisitsCats from '../../pages/VisitsCats/VisitsCats';
import Footer from '../Footer/Footer';
import AnimalPage from '../../pages/AnimalPage/AnimalPage';
import ProfilePage from '../../pages/Profile/Profile';
import ListAnimals from '../../pages/ListAnimals/ListAnimals';
import UsersList from '../../pages/UsersList/UsersList';
import Box from '../../pages/Box/Box';
import MentionsPage from '../../pages/MentionsPage/MentionsPage';

// fonctions
import { useSelector } from 'react-redux';
import { actionSetToken, actionTokenChecked } from '../../actions/tokenAction';

import './App.scss';

function App() {
	const [filter, setFilter] = useState(false);
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
			<div className={'app'}>
				<div className='menu'>
					<div className='menu-desktop'>
						<Header />
					</div>
					<div className='menu-mobile'>
						<MobileHeader />
					</div>
				</div>
				<div className='app-main-container'>
					<div className='main'>
						<Routes>
							{/* pages accessibles à l'utilisateur connecté */}
							<Route element={<PrivateRoutes />}>
								<Route path='/home' element={<Home />} />
								<Route
									path='/walks'
									element={<WalkingDog filter={filter} setFilter={setFilter} />}
								/>
								<Route path='/visits' element={<VisitsCats />} />
								<Route
									path='/animals'
									element={
										<ListAnimals filter={filter} setFilter={setFilter} />
									}
								/>
							</Route>

							{/* pages accessibles à l'admin connecté */}
							<Route element={<PrivateRoutesAdmin />}>
								<Route path='/admin' element={<Dashboard />} />
								<Route
									path='/admin/create/user'
									element={<DashboardVolunteerCreation />}
								/>
								<Route
									path='/admin/create/card'
									element={<DashboardAnimalCreation />}
								/>
								<Route path='/admin/users' element={<UsersList />} />
							</Route>

							<Route
								path='/profile'
								element={
									isConnected ? (
										<ProfilePage />
									) : (
										<Navigate to='/login' replace />
									)
								}
							/>
							<Route
								path='/animal/:animalId'
								element={
									isConnected ? (
										<AnimalPage />
									) : (
										<Navigate to='/login' replace />
									)
								}
							/>

							<Route
								path='/box/:boxId'
								element={
									isConnected ? <Box /> : <Navigate to='/login' replace />
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
								element={
									isConnected ? <Navigate to='/' replace /> : <LoginForm />
								}
							/>

							<Route path='/mentions-legales' element={<MentionsPage />} />
							<Route path='*' element={<Error404 />} />
						</Routes>
					</div>
				</div>

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
