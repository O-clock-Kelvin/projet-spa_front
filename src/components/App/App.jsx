import React from 'react';
// import PropTypes from 'prop-types';

import './styles.scss';

import LoginForm from '../LoginForm/LoginForm';
import Header from '../Header/Header';
import MobileHeader from '../MobileHeader/MobileHeader';

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
      <LoginForm/>
    </div>

  );
}


App.propTypes = {
  
};

export default React.memo(App);
