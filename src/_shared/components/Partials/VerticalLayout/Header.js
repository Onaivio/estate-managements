import PropTypes from 'prop-types'
import React, { useState } from "react"

import { connect } from "react-redux"
import { Row, Col } from "reactstrap"

import { Link } from "react-router-dom"

// Reactstrap
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap"

// Import menuDropdown
import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown"
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown"
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu"

import megamenuImg from "../../../../assets/images/megamenu-img.png"
import logoLightPng from "../../../../assets/images/logo-light.png"
import logoLightSvg from "../../../../assets/images/logo-light.svg"
import logoDark from "../../../../assets/images/logo-dark.png"

// import images
import github from "../../../../assets/images/brands/github.png"
import bitbucket from "../../../../assets/images/brands/bitbucket.png"
import dribbble from "../../../../assets/images/brands/dribbble.png"
import dropbox from "../../../../assets/images/brands/dropbox.png"
import mail_chimp from "../../../../assets/images/brands/mail_chimp.png"
import slack from "../../../../assets/images/brands/slack.png"

//i18n
import { withTranslation } from "react-i18next"
import logo from '../../../../assets/images/logo.png';


// Redux Store
import {
    showRightSidebarAction,
    toggleLeftmenu,
    changeSidebarType,
} from "../../../../store/layout/actions"

const Header = props => {
    const [search, setsearch] = useState(false)
    const [megaMenu, setmegaMenu] = useState(false)
    const [socialDrp, setsocialDrp] = useState(false)

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    function toggleFullscreen() {
        if (
            !document.fullscreenElement &&
            /* alternative standard method */ !document.mozFullScreenElement &&
            !document.webkitFullscreenElement
        ) {
            // current working methods
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen()
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen()
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(
                    Element.ALLOW_KEYBOARD_INPUT
                )
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen()
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen()
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen()
            }
        }
    }

    function tToggle() {
        props.toggleLeftmenu(!props.leftMenu)
        if (props.leftSideBarType === "default") {
            props.changeSidebarType("condensed", isMobile)
        } else if (props.leftSideBarType === "condensed") {
            props.changeSidebarType("default", isMobile)
        }
    }
    return (
        <React.Fragment>
            <header id="page-topbar">
                <div className="navbar-header">
                    <div className="d-flex">
                        <div className="navbar-brand-box">
                            <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                    {/*<span style={{fontSize: 25}}>Tatup</span>*/}

                  <img src={logo} alt="" height="22" />
                </span>
                                <span className="logo-lg">
                  <img src={logo} alt="" height="22" />

                  {/*<img src={logoDark} alt="" height="17" />*/}
                </span>
                            </Link>

                            <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logo} alt="" height="22" />

                  {/*<img src={logoLightSvg} alt="" height="22" />*/}
                </span>
                                <span className="logo-lg">
                  <img src={logo} alt="" height="22" />

                  {/*<img src={logoLightPng} alt="" height="19" />*/}
                </span>
                            </Link>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                tToggle()
                            }}
                            className="btn btn-sm px-3 font-size-16 header-item waves-effect"
                            id="vertical-menu-btn"
                        >
                            <i className="fa fa-fw fa-bars"/>
                        </button>

                        <Dropdown
                            className="dropdown-mega d-none d-lg-block ml-2"
                            isOpen={megaMenu}
                            toggle={() => {
                                setmegaMenu(!megaMenu)
                            }}
                        >
                            <DropdownMenu className="dropdown-megamenu">
                                <Row>
                                    <Col sm={8}>
                                        <Row>
                                            <Col md={4}>
                                                <h5 className="font-size-14 mt-0">
                                                    {props.t("UI Components")}
                                                </h5>
                                                <ul className="list-unstyled megamenu-list">
                                                    <li>
                                                        <Link to="#">{props.t("Lightbox")}</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="#">{props.t("Range Slider")}</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="#">{props.t("Sweet Alert")}</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="#">{props.t("Rating")}</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="#">{props.t("Forms")}</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="#">{props.t("Tables")}</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="#">{props.t("Charts")}</Link>
                                                    </li>
                                                </ul>
                                            </Col>

                                            <Col md={4}>
                                                <h5 className="font-size-14 mt-0">
                                                    {props.t("Applications")}
                                                </h5>
                                                <ul className="list-unstyled megamenu-list">
                                                    <li>
                                                        <Link to="#">{props.t("Ecommerce")}</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="#">{props.t("Calendar")}</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="#">{props.t("Email")}</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="#">{props.t("Projects")}</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="#">{props.t("Tasks")}</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="#">{props.t("Contacts")}</Link>
                                                    </li>
                                                </ul>
                                            </Col>

                                            <Col md={4}>
                                                <h5 className="font-size-14 mt-0">
                                                    {props.t("Extra Pages")}
                                                </h5>
                                                <ul className="list-unstyled megamenu-list">
                                                    <li>
                                                        <Link to="#">{props.t("Light Sidebar")}</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="#">{props.t("Compact Sidebar")}</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="#">{props.t("Horizontal layout")}</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="#"> {props.t("Maintenance")}</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="#">{props.t("Coming Soon")}</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="#">{props.t("Timeline")}</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="#">{props.t("FAQs")}</Link>
                                                    </li>
                                                </ul>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col sm={4}>
                                        <Row>
                                            <Col sm={6}>
                                                <h5 className="font-size-14 mt-0">
                                                    {props.t("UI Components")}
                                                </h5>
                                                <ul className="list-unstyled megamenu-list">
                                                    <li>
                                                        <Link to="#">{props.t("Lightbox")}</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="#">{props.t("Range Slider")}</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="#">{props.t("Sweet Alert")}</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="#">{props.t("Rating")}</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="#">{props.t("Forms")}</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="#">{props.t("Tables")}</Link>
                                                    </li>
                                                    <li>
                                                        <Link to="#">{props.t("Charts")}</Link>
                                                    </li>
                                                </ul>
                                            </Col>

                                            <Col sm={5}>
                                                <div>
                                                    <img
                                                        src={megamenuImg}
                                                        alt=""
                                                        className="img-fluid mx-auto d-block"
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className="d-flex">
                        <div className="dropdown d-inline-block d-lg-none ml-2">
                            <button
                                onClick={() => {
                                    setsearch(!search)
                                }}
                                type="button"
                                className="btn header-item noti-icon waves-effect"
                                id="page-header-search-dropdown"
                            >
                                <i className="mdi mdi-magnify"/>
                            </button>
                            <div
                                className={
                                    search
                                        ? "dropdown-menu dropdown-menu-lg dropdown-menu-right p-0 show"
                                        : "dropdown-menu dropdown-menu-lg dropdown-menu-right p-0"
                                }
                                aria-labelledby="page-header-search-dropdown"
                            >
                                <form className="p-3">
                                    <div className="form-group m-0">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search ..."
                                                aria-label="Recipient's username"
                                            />
                                            <div className="input-group-append">
                                                <button className="btn btn-primary" type="submit">
                                                    <i className="mdi mdi-magnify"/>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <LanguageDropdown />

                        <Dropdown
                            className="d-none d-lg-inline-block ml-1"
                            isOpen={socialDrp}
                            toggle={() => {
                                setsocialDrp(!socialDrp)
                            }}
                        >
                            <DropdownToggle
                                className="btn header-item noti-icon waves-effect"
                                tag="button"
                            >
                                <i className="bx bx-customize"/>
                            </DropdownToggle>
                        </Dropdown>

                        <div className="dropdown d-none d-lg-inline-block ml-1">
                            <button
                                type="button"
                                onClick={() => {
                                    toggleFullscreen()
                                }}
                                className="btn header-item noti-icon waves-effect"
                                data-toggle="fullscreen"
                            >
                                <i className="bx bx-fullscreen"/>
                            </button>
                        </div>

                        <ProfileMenu />

                    </div>
                </div>
            </header>
        </React.Fragment>
    )
}

Header.propTypes = {
    changeSidebarType: PropTypes.func,
    leftMenu: PropTypes.any,
    leftSideBarType: PropTypes.any,
    showRightSidebar: PropTypes.any,
    showRightSidebarAction: PropTypes.func,
    t: PropTypes.any,
    toggleLeftmenu: PropTypes.func
}

const mapStatetoProps = state => {
    const {
        layoutType,
        showRightSidebar,
        leftMenu,
        leftSideBarType,
    } = state.Layout
    return { layoutType, showRightSidebar, leftMenu, leftSideBarType }
}

export default connect(mapStatetoProps, {
    showRightSidebarAction,
    toggleLeftmenu,
    changeSidebarType,
})(withTranslation()(Header))
