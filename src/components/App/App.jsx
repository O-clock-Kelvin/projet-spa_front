import React from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';

import './styles.scss';

import Header from '../Header/Header';
import MobileHeader from '../MobileHeader/MobileHeader';
import LoginForm from '../LoginForm/LoginForm';

function App() {
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
        <Route 
          path="/" 
          element={<Navigate to="/login" replace/>} 
        />
        <Route
          path="/login"
          element={<LoginForm />}
        />
      </Routes>

    </div>
  );
}

App.propTypes = {
  
};

export default React.memo(App);
