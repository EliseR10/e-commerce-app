import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({children}) => {
    const {isAuthenticated, user} = useContext(AuthContext);
    
    if (!isAuthenticated) {
        return <Navigate to='/' replace />;
    }

    return children;
};

export default ProtectedRoute;