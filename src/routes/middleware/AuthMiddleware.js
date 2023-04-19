import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const AuthMiddleware = ({ component: Component, layout: Layout }) => (
    <Route
        render={props => {
            return (
                <Layout>
                    <Component {...props} />
                </Layout>
            );
        }}
    />
);

AuthMiddleware.propTypes = {
    component: PropTypes.any,
    layout: PropTypes.any,
};

export default AuthMiddleware;
