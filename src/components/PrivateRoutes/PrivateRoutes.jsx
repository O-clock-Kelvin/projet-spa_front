import React from 'react';
import { useSelector } from 'react-redux';

import { Outlet, Navigate } from 'react-router-dom';

function PrivateRoutes() {

    const token = useSelector((fullstate) => fullstate.loginSettings.token);
    
    return (
        token ? <Outlet /> : <Navigate to="/login" replace/>
    );
}

export default React.memo(PrivateRoutes);
