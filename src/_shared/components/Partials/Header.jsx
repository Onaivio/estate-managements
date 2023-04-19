import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, } from 'react-bootstrap'

import logo from 'assets/images/logo.svg'
import thumb from 'assets/images/profile/2.png'

const propTypes = {};

const defaultProps = {};


const Header = props => {

    return (
        <>
            <div className="header">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="header-content">
                                <div className="header-left">
                                    <div className="brand-logo">
                                        <Link to={"/"}>
                                            <img src={logo} alt="" />
                                            <span>Payrosx</span>
                                        </Link>
                                    </div>
                                    <div className="search">
                                        <form action="#">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Search Here" />
                                                <span className="input-group-text">
                                                    <i className="icofont-search"/>
                                                </span>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                <div className="header-right">
                                    {/* <div className="dark-light-toggle" onclick="themeToggle()">
                                        <span className="dark"><i className="icofont-moon"></i></span>
                                        <span className="light"><i className="icofont-sun-alt"></i></span>
                                    </div> */}

                                    <Dropdown className="notification" alignRight>
                                        <Dropdown.Toggle>
                                            <div className="notify-bell" data-toggle="dropdown">
                                                <span>
                                                    <i className="icofont-alarm"/>
                                                </span>
                                            </div>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="notification-list">
                                            <h4>Announcements</h4>
                                            <div className="lists">
                                                <Link to={"#"} className="">
                                                    <div className="d-flex align-items-center">
                                                        <span className="mr-3 icon success">
                                                            <i className="icofont-check"/>
                                                        </span>
                                                        <div>
                                                            <p>Account created successfully</p>
                                                            <span>2020-11-04 12:00:23</span>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <Link to={"#"} className="">
                                                    <div className="d-flex align-items-center">
                                                        <span className="mr-3 icon fail">
                                                            <i className="icofont-close"/>
                                                        </span>
                                                        <div>
                                                            <p>2FA verification failed</p>
                                                            <span>2020-11-04 12:00:23</span>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <Link to={"#"} className="">
                                                    <div className="d-flex align-items-center">
                                                        <span className="mr-3 icon success">
                                                            <i className="icofont-check"/>
                                                        </span>
                                                        <div>
                                                            <p>Device confirmation completed</p>
                                                            <span>2020-11-04 12:00:23</span>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <Link to={"#"} className="">
                                                    <div className="d-flex align-items-center">
                                                        <span className="mr-3 icon pending">
                                                            <i className="icofont-warning"/>
                                                        </span>
                                                        <div>
                                                            <p>Phone verification pending</p>
                                                            <span>2020-11-04 12:00:23</span>
                                                        </div>
                                                    </div>
                                                </Link>

                                                <Link to={"./settings-activity"}>More
                                                    <i className="icofont-simple-right"/>
                                                </Link>

                                            </div>
                                        </Dropdown.Menu>
                                    </Dropdown>


                                    <Dropdown className="profile_log" alignRight>
                                        <Dropdown.Toggle>
                                            <span className="thumb"><img src={thumb} alt="" width="30" /></span>
                                            <span className="arrow">
                                                <i className="icofont-angle-down"/>
                                            </span>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <div className="user-email">
                                                <div className="user">
                                                    <span className="thumb"><img src={thumb} alt="" /></span>
                                                    <div className="user-info">
                                                        <h5>Jannatul Maowa</h5>
                                                        <span>Qash.inc@gmail.com</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="user-balance">
                                                <div className="available">
                                                    <p>Available</p>
                                                    <span>0.00 BTC</span>
                                                </div>
                                                <div className="total">
                                                    <p>Total</p>
                                                    <span>0.00 USD</span>
                                                </div>
                                            </div>
                                            <Link to={"profile"} className="dropdown-item">
                                                <i className="icofont-ui-user"/>
                                                Profile
                                            </Link>
                                            <Link to={"wallet"} className="dropdown-item">
                                                <i className="icofont-wallet"/>Wallet
                                            </Link>
                                            <Link to={"signin"} className="dropdown-item logout">
                                                <i className="icofont-logout"/> Logout
                                            </Link>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
