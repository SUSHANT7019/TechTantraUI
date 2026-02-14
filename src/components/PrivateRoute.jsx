import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
    const token = localStorage.getItem('token');
    console.log("PrivateRoute: Token present?", !!token);

    if (!token) {
        console.log("PrivateRoute: No token, redirecting to login");
        return <Navigate to="/admin/login" replace />;
    }

    return children;
}
