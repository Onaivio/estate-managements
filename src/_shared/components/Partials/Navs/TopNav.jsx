import React from 'react';
import NavItem from './NavItem';
import PropTypes from 'prop-types';
import { NAV_TYPE_TOP } from '../../../constants/AppConstant';


const propTypes = {
    navigation: PropTypes.array.isRequired,
};

const defaultProps = {
    navigation: [],
};

const TopNav = props => {
    const { navigation } = props;
    return (
        <div className={`top-nav dark`} style={{ backgroundColor: '#3e82f7' }}>
            <div className="top-nav-wrapper">
                <NavItem
                    type={NAV_TYPE_TOP}
                    navigation={navigation}
                />
            </div>
        </div>
    );
};

TopNav.propTypes = propTypes;
TopNav.defaultProps = defaultProps;

export default TopNav;
