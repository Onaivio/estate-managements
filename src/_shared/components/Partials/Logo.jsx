import React from 'react';
import { Grid } from 'antd';
import { connect } from 'react-redux';
import { NAV_TYPE_TOP, SIDE_NAV_COLLAPSED_WITH, SIDE_NAV_WIDTH } from '../../constants/AppConstant';
import { getBreakPoint } from '../../functions/util';
import { APP_NAME } from '../../config';


const { useBreakpoint } = Grid;

const getLogoWithGutter = (props, isMobile) => {
    const { navCollapsed, navType } = props;
    const isNavTop = navType === NAV_TYPE_TOP;
    if (isMobile && !props.mobileLogo) {
        return 0;
    }
    if (isNavTop) {
        return 'auto';
    }
    if (navCollapsed) {
        return `${SIDE_NAV_COLLAPSED_WITH}px`;
    } else {
        return `${SIDE_NAV_WIDTH}px`;
    }
};

const getLogo = (props) => {
    const { navCollapsed, logoType } = props;
    if (logoType === 'light') {
        if (navCollapsed) {
            return '/img/logo-sm-white.png';
        }
        return '/img/logo-white.png';
    }
    if (navCollapsed) {
        return '/img/logo-sm.png';
    }
    return '/img/logo.png';
};


const getLogoDisplay = (isMobile, mobileLogo) => {
    if (isMobile && !mobileLogo) {
        return 'd-none';
    }
    return 'logo';
};

export const Logo = props => {
    const isMobile = !getBreakPoint(useBreakpoint()).includes('lg');
    return (
        <div
            className={getLogoDisplay(isMobile, props.mobileLogo)}
            style={{ width: `${getLogoWithGutter(props, isMobile)}` }}
        >
            <img src={getLogo(props)} alt={`${APP_NAME} logo`}/>
        </div>
    );
};

const stateProps = ({ ui }) => ({
    navCollapsed: ui.navCollapsed,
    navType: ui.navType,
});

export default connect(stateProps)(Logo);
