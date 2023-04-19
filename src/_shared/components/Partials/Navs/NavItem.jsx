import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Row, Col, Collapse } from 'reactstrap';
import classname from 'classnames';


const propTypes = {
    navigation: PropTypes.array,
    location: PropTypes.any,
    menuOpen: PropTypes.any,
    t: PropTypes.any,
};


const defaultProps = {
    navigation: [],
};


const NavItem = props => {
    const { navigation = [], leftMenu, t, menuOpen } = props;
    const [dashboard, setdashboard] = useState(false);
    const [sendNow, setSendNow] = useState(false);
    const [transactionHistory, setTransactionHistory] = useState(false);
    const [upgradePremium, setUpgradePremium] = useState(false);

    useEffect(() => {
        let matchingMenuItem = null;
        let ul = document.getElementById('navigation');
        let items = ul.getElementsByTagName('a');
        for (let i = 0; i < items.length; ++i) {
            if (props.location.pathname === items[i].pathname) {
                matchingMenuItem = items[i];
                break;
            }
        }
        if (matchingMenuItem) {
            activateParentDropDown(matchingMenuItem);
        }
    });

    const activateParentDropDown = (item) => {
        item.classList.add('active');
        const parent = item.parentElement;
        if (parent) {
            parent.classList.add('active'); // li
            const parent2 = parent.parentElement;
            parent2.classList.add('active'); // li
            const parent3 = parent2.parentElement;
            if (parent3) {
                parent3.classList.add('active'); // li
                const parent4 = parent3.parentElement;
                if (parent4) {
                    parent4.classList.add('active'); // li
                    const parent5 = parent4.parentElement;
                    if (parent5) {
                        parent5.classList.add('active'); // li
                        const parent6 = parent5.parentElement;
                        if (parent6) {
                            parent6.classList.add('active'); // li
                        }
                    }
                }
            }
        }
        return false;
    };

    return (
        <>
            <div className="topnav">
                <div className="container-fluid">
                    <nav
                        className="navbar navbar-light navbar-expand-lg topnav-menu"
                        id="navigation"
                    >
                        <Collapse
                            isOpen={props.leftMenu}
                            className="navbar-collapse"
                            id="topnav-menu-content"
                        >
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <Link
                                        className="nav-link dropdown-toggle arrow-none"
                                        onClick={e => {
                                            e.preventDefault();
                                            setdashboard(!dashboard);
                                        }}
                                        to="dashboard"
                                    >
                                        <i className="bx bx-home-circle mr-2"/>
                                        {props.t('Dashboard')} {props.menuOpen}
                                    </Link>
                                </li>

                                <li className="nav-item dropdown">
                                    <Link
                                        to="/#"
                                        onClick={e => {
                                            e.preventDefault();
                                            setSendNow(!sendNow);
                                        }}
                                        className="nav-link dropdown-toggle arrow-none"
                                    >
                                        <i className="bx bx-tone mr-2"/>
                                        {props.t('Send Now')}
                                    </Link>
                                </li>

                                <li className="nav-item dropdown">
                                    <Link
                                        to="/#"
                                        onClick={e => {
                                            e.preventDefault();
                                            setTransactionHistory(!transactionHistory);
                                        }}
                                        className="nav-link dropdown-toggle arrow-none"
                                    >
                                        <i className="bx bx-tone mr-2"/>
                                        {props.t('Transaction History')}
                                    </Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link
                                        to="/#"
                                        onClick={e => {
                                            e.preventDefault();
                                            setUpgradePremium(!upgradePremium);
                                        }}
                                        className="nav-link dropdown-toggle arrow-none"
                                    >
                                        <i className="bx bx-tone mr-2"/>
                                        {props.t('Upgrade to Premium')}
                                    </Link>
                                </li>

                            </ul>
                        </Collapse>
                    </nav>
                </div>
            </div>
        </>
    );
};

NavItem.propTypes = propTypes;
NavItem.defaultProps = defaultProps;

const stateProps = ({ ui }) => ({
    leftMenu: ui.leftMenu,
});

export default withRouter(connect(stateProps, {})(withTranslation()(NavItem)));

