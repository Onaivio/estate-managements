import React from 'react';
import { Link } from 'react-router-dom';
import logo from 'assets/images/logo.svg';
import PropTypes from 'prop-types';


const propTypes = {
    navigations: PropTypes.array,
};

const defaultProps = {
    navigation: [],
};

const Sidebar = (prop) => {

    const { navigation = [] } = prop;
    return (
        <>
            <div className="sidebar">
                <div className="brand-logo">
                    <Link to={'/'}><img src={logo} alt=""/>
                    </Link>
                </div>
                <div className="menu">
                    <ul>
                        {navigation && navigation.length && navigation.map(({ title, path, icon }, index) => (
                            <li key={index}>
                                <Link to={path} title={title}>
                                    <span><i className={icon}/></span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <p className="copyright">
                        &#169; <Link to={'/'}>Tatup</Link>
                    </p>
                </div>
            </div>
        </>
    );
};

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

export default Sidebar;
