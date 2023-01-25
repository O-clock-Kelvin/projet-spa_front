import React from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';

// composants
import Header from '../Header/Header';
import MobileHeader from '../MobileHeader/MobileHeader';
import LoginForm from '../LoginForm/LoginForm';
import Home from '../Home/Home';
import Dashboard from '../Dashboard/Dashboard';
import PrivateRoutes from '../PrivateRoute/PrivateRoute';

// fonctions
import { useSelector } from 'react-redux';

import './styles.scss';
function App() {

  const isConnected = useSelector((fullstate) => fullstate.loginSettings.isConnected);
  const admin = useSelector((fullstate) => fullstate.loginSettings.admin);

  console.log(isConnected, admin);

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
        <Route element={<PrivateRoutes />}>
          <Route 
            path="/home"
            element={<Home />}
          />
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
       </Routes>

    </div>
  );
}

App.propTypes = {
  
};

export default React.memo(App);
