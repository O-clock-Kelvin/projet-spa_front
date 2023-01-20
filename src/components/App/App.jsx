import React from 'react';
// import PropTypes from 'prop-types';

import './styles.scss';

import LoginForm from '../LoginForm/LoginForm';

function App() {
  return (
    <div className="app">
      <LoginForm/>
    </div>

  );
}


App.propTypes = {
  
};

export default React.memo(App);
