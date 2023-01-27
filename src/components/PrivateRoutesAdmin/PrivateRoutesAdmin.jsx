/** @format */

import React from 'react';
import { useSelector } from 'react-redux';

import { Outlet, Navigate } from 'react-router-dom';

function PrivateRoutesAdmin() {
	const token = useSelector((fullstate) => fullstate.loginSettings.token);
	const admin = useSelector((fullstate) => fullstate.loginSettings.admin);

	return token && admin ? <Outlet /> : <Navigate to='/login' replace />;
}

export default React.memo(PrivateRoutesAdmin);
