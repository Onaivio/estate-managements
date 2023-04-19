import React, { Suspense, useEffect, useState } from 'react';
import { Switch, Redirect, withRouter } from 'react-router-dom';
import Route from '../Extends/Route';
import PropTypes from 'prop-types';
import Loading from './Loading';
import {
    changeLayout,
    changeLayoutWidth,
    changeSidebarTheme, changeSidebarType,
    changeTopbarTheme,
    initialize,
} from '../../../redux/actions';
import { connect } from 'react-redux';
// import Header from './Header';
import Header from './../Partials/VerticalLayout/Header';
import Sidebar from './../Partials/VerticalLayout/Sidebar';
import Dashboard from '../../../Modules/Agent/Dashboard';
import { capitalizeFirstLetter } from '../../functions/util';
import Footer from './VerticalLayout/Footer';

const propTypes = {
    location: PropTypes.object,
    initialize: PropTypes.func,
    navigation: PropTypes.array,
    changeLayout: PropTypes.func,
    changeLayoutWidth: PropTypes.func,
    changeTopbarTheme: PropTypes.func,
    children: PropTypes.object,
    isPreloader: PropTypes.any,
    layoutWidth: PropTypes.any,
    showRightSidebar: PropTypes.any,
    topbarTheme: PropTypes.any,
};

const defaultProps = {
    navigation: [],
    routes: [],
};

const AppLayout = props => {
    const {
        routes = [],
        user,
        userAccount,
        initialize,
        match: { params },
        navigation = [],
        location,
        topbarTheme,
        changeTopbarTheme,
        isPreloader,
        leftSideBarTheme,
        changeSidebarTheme,
        layoutWidth,
        changeLayoutWidth,
        leftSideBarType,
        changeSidebarType,
    } = props;

    const [isMobile, setMobile] = useState(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));

    console.log('user:', user);

    useEffect(() => {
        if (params['module']) {
            initialize({ module: params['module'], userAccount: user });
        }
    }, [params['module'], user]);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (leftSideBarTheme) {
            changeSidebarTheme(leftSideBarTheme);
        }

        if (layoutWidth) {
            changeLayoutWidth(layoutWidth);
        }

        if (leftSideBarType) {
            changeSidebarType(leftSideBarType);
        }
        if (topbarTheme) {
            changeTopbarTheme(topbarTheme);
        }
    }, []);

    return (
        <>
            <div id="layout-wrapper" style={{ backgroundColor: '#f3f3f5' }}>
                <Header/>
                <Sidebar navigation={navigation} theme={leftSideBarTheme} type={leftSideBarType} isMobile={isMobile}/>
                <div className="main-content" style={{ backgroundColor: '#f3f3f5' }}>
                    <Suspense fallback={<Loading/>}>
                        <Switch>
                            {routes &&
                            routes.length &&
                            routes.map(({ component, path, name, exact, isPrivate, redirect }, index) => {
                                    if (component) {
                                        return (
                                            <Route
                                                key={index}
                                                path={`/${params['module']}${path}`}
                                                exact={exact}
                                                name={name}
                                                isPrivate={isPrivate || undefined}
                                                component={component}
                                                {...props}
                                            />
                                        );
                                    } else if (redirect) {
                                        return (
                                            <Redirect
                                                key={index}
                                                to={`${params['module']}/dashboard`}
                                            />
                                        );
                                    }
                                },
                            )}
                        </Switch>
                    </Suspense>
                </div>
                {/*<Footer/>*/}
            </div>
        </>
    );
};

AppLayout.propTypes = propTypes;
AppLayout.defaultProps = defaultProps;

const stateProps = ({ ui, app }) => ({
    routes: ui.initialize.routes,
    navigation: ui.initialize.navigation,
    user: app.user.data,
    ...ui,
});

const dispatchProps = {
    initialize,
    changeTopbarTheme,
    changeLayout,
    changeLayoutWidth,
    changeSidebarTheme,
    changeSidebarType,
};

export default connect(stateProps, dispatchProps)(withRouter(AppLayout));
