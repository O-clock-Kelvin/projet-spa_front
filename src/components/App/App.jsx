import React from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';

import './styles.scss';

import LoginForm from '../LoginForm/LoginForm';
function App() {
  return (
    <div className="app">
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
