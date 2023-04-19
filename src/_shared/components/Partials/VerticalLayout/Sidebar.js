import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//Simple bar
import SimpleBar from 'simplebar-react';

//i18n
import { withTranslation } from 'react-i18next';
import SidebarContent from './SidebarContent';

const propTypes = {
    navigation: PropTypes.array.isRequired,
    type: PropTypes.string,
};

const defaultProps = {
    navigation: [],
};

const Sidebar = props => {

    const { navigation = [] } = props;
    console.log('Sidebar-navigation:', navigation);
    return (
        <React.Fragment>
            <div className="vertical-menu">
                <div data-simplebar className="h-100">
                    {props.type !== 'condensed' ? (
                        <SimpleBar style={{ maxHeight: '100%' }}>
                            <SidebarContent navigation={navigation}/>
                        </SimpleBar>
                    ) : (
                        <SidebarContent navigation={navigation}/>
                    )}
                </div>
            </div>
        </React.Fragment>
    );
};

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

const stateProps = state => ({
    layout: state.Layout,
});
export default connect(
    stateProps,
    {},
)(withRouter(withTranslation()(Sidebar)));
