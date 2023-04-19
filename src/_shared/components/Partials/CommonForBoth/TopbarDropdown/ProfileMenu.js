import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import pr from "../../../../../assets/images/pr.png"

import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';

//i18n
import { withTranslation } from 'react-i18next';
// Redux
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

// users
import user1 from 'assets/images/users/avatar-1.jpg';
import {fetchAccount} from "../../../../../redux/actions/app/account";



const propTypes = {
    user: PropTypes.object,
    isSubmitting: PropTypes.bool,
    updateAccount: PropTypes.func,
    error: PropTypes.any,
};

const defaultProps = {
    isSubmitting: false,
    user: null,
    error: null,
};

const ProfileMenu = props => {
    const {
        account,
         } = props;


    useEffect(() => {
        getAccount();
    }, []);

    const getAccount = (params = {}) => {
        // fetchAccount(user.account, {
        //     ...params,
        //     population: JSON.stringify({ path: 'user', select: 'first_name last_name mobile' }),
        // });
    };

    const [menu, setMenu] = useState(false);

    const [currentprofiletype, setcurrentprofiletype] = useState('');

    useEffect(() => {
        if (localStorage.getItem('authUser')) {
            if (process.env.REACT_APP_API_HOST) {
                const obj = JSON.parse(localStorage.getItem('current_profile_type'));
                setcurrentprofiletype(obj.displayName);
            } {
                const obj = JSON.parse(localStorage.getItem('current_profile_type'));
                setcurrentprofiletype(obj.username);
            }
        }
    }, [props.success]);

    return (
        <React.Fragment>
            <Dropdown
                isOpen={menu}
                toggle={() => setMenu(!menu)}
                className="d-inline-block"
            >
                <DropdownToggle
                    className="btn header-item waves-effect"
                    id="page-header-user-dropdown"
                    tag="button"
                >
                    <img
                        className="rounded-circle header-profile-user"
                        src={(account && account.avatar && account.avatar.url) ? account.avatar.url : pr }
                        alt="Header Avatar"
                    />
                    <span className="d-none d-xl-inline-block ml-2 mr-1">{currentprofiletype}</span>
                    <i className="mdi mdi-chevron-down d-none d-xl-inline-block"/>
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem tag="a" href="/profile">
                        {' '}
                        <i className="bx bx-user font-size-16 align-middle mr-1"/>
                        profile
                    </DropdownItem>
                     <div className="dropdown-divider"/>
                    <Link to="/login" className="dropdown-item">
                        <i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger"/>
                        <span>Logout</span>
                    </Link>
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    );
};

ProfileMenu.propTypes = propTypes;
ProfileMenu.defaultProps = defaultProps;

const stateProps = ({ app, ui, accounts }) => ({
    user: app.user.data,
    isSubmitting: ui.loading.updateAccount,
    account: accounts.current,
    error: ui.errors.updateAccount,
});

const dispatchProps = {
    fetchAccount,
};
export default connect(stateProps, dispatchProps)(ProfileMenu);
