import React from 'react';
import { Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

const loading = () => (
    <div id="preloader">
        <div id="status">
            <div className="spinner-chase">
                <div className="chase-dot"/>
                <div className="chase-dot"/>
                <div className="chase-dot"/>
                <div className="chase-dot"/>
                <div className="chase-dot"/>
                <div className="chase-dot"/>
            </div>
        </div>
    </div>
);

const Login = Loadable({
    loader: () => import('../Authentication/Login/Login'),
    loading,
});



const ResetPassword = Loadable({
    loader: () => import('../Authentication/ResetPassword/ForgotPassword'),
    loading,
});

const UpdatePassword = Loadable({
    loader: () => import('../Authentication/UpdatePassword/UpdatePassword'),
    loading,
});




const authRoutes = [
    { path: '/login', component: Login },
    { path: '/reset-password', component: ResetPassword },
    { path: '/update-password', component: UpdatePassword },

];

export {  authRoutes };
