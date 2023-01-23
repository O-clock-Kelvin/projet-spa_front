import React from 'react';
// import PropTypes from 'prop-types';

import './styles.scss';

import LoginForm from '../LoginForm/LoginForm';
import Header from '../Header/Header';

function App() {
  return (
    <div className="app">
      <Header/>
      <LoginForm/>
    </div>

  );
}


App.propTypes = {
  
};

export default React.memo(App);
