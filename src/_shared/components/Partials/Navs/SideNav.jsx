import React from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import NavItem from './NavItem';
import { NAV_TYPE_SIDE, SIDE_NAV_DARK, SIDE_NAV_WIDTH } from '../../../constants/AppConstant';

const { Sider } = Layout;

const propTypes = {
    navigation: PropTypes.array,
};

const defaultProps = {
    navigation: [],
};

const SideNav = (props) => {
    const {
        navCollapsed,
        sideNavTheme,
        localization = true,
        navigation = [],
    } = props;

    return (
        <Sider
            className={`side-nav ${(sideNavTheme && sideNavTheme === SIDE_NAV_DARK) ? 'side-nav-dark' : ''}`}
            width={SIDE_NAV_WIDTH}
            collapsed={navCollapsed}
        >
            <Scrollbars autoHide>
                <NavItem
                    type={NAV_TYPE_SIDE}
                    navigation={navigation}>
                </NavItem>
            </Scrollbars>
        </Sider>
    );
};

SideNav.propTypes = propTypes;
SideNav.defaultProps = defaultProps;

export default SideNav;
