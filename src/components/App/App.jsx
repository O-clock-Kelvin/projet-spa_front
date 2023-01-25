import React, { useEffect } from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';

// composants
import Header from '../Header/Header';
import MobileHeader from '../MobileHeader/MobileHeader';
import LoginForm from '../LoginForm/LoginForm';
import Home from '../Home/Home';
import Dashboard from '../Dashboard/Dashboard';
import PrivateRoutes from '../PrivateRoutes/PrivateRoutes';
import PrivateRoutesAdmin from '../PrivateRoutesAdmin/PrivateRoutesAdmin';
import Error404 from '../Error404/Error404';

// fonctions
import { useSelector } from 'react-redux';
import { actionSetToken } from '../../actions/tokenAction';

import './styles.scss';

import { useDispatch } from 'react-redux';
function App() {

  const isConnected = useSelector((fullstate) => fullstate.loginSettings.isConnected);
  const admin = useSelector((fullstate) => fullstate.loginSettings.admin);
  const token = useSelector((fullstate) => fullstate.loginSettings.token);

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      // on vérifie si on a un token déjà présent dans le localstorage
      const tokenFromLocalStorage = localStorage.getItem('token');
      
      // si oui on l'envoie au state de redux
      if (tokenFromLocalStorage) {
        const parsedToken = JSON.parse(tokenFromLocalStorage);
        dispatch(actionSetToken(parsedToken));
      }
    }
    catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    // à chaque changement du token dsu state de redux, on le modifie dans le localstorage
    if(token) {
      const stringifiedToken = JSON.stringify(token);
      localStorage.setItem('token', stringifiedToken);
    }
  }, [token]);

  return (
    <div className="app">
     <div className="menu" >
        <div className="menu-desktop">
          <Header/>
        </div>
        <div  className="menu-mobile">
          <MobileHeader/>
        </div>
      </div>
      <Routes >
        {/* pages accessibles à l'utilisateur connecté */}
        <Route element={<PrivateRoutes />}>
          <Route 
            path="/home"
            element={<Home />}
          />
        </Route>

        {/* pages accessibles à l'admin connecté */}
        <Route element={<PrivateRoutesAdmin />}>
          <Route
            path="/admin"
            element={<Dashboard />}
          />
        </Route>

        <Route 
          path="/" 
          element={<Navigate to="/login" replace/>} 
        />
        <Route
          path="/login"
          element={
            (isConnected && !admin) ? (<Navigate to="/home" replace/>) :
            (isConnected && admin) ? (<Navigate to="/admin" replace/>) :
            (<LoginForm />)}
        />
        <Route
          path="*"
          element={<Error404 />}
        />
       </Routes>

    </div>
  );
}

App.propTypes = {
  
};

export default React.memo(App);
