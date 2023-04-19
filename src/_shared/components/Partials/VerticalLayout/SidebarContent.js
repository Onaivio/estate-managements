import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

// MetisMenu
import MetisMenu from 'metismenujs';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

//i18n
import { withTranslation } from 'react-i18next';

const propTypes = {
    navigation: PropTypes.array.isRequired,
    location: PropTypes.object,
    t: PropTypes.any,
};

const defaultProps = {
    navigation: [],
};

const SidebarContent = props => {

    const { navigation = [], location } = props;

    useEffect(() => {
        const pathName = location.pathname;
        const initMenu = () => {
            new MetisMenu('#side-menu');
            let matchingMenuItem = null;
            const ul = document.getElementById('side-menu');
            const items = ul.getElementsByTagName('a');
            for (let i = 0; i < items.length; ++i) {
                if (pathName === items[i].pathname) {
                    matchingMenuItem = items[i];
                    break;
                }
            }
            if (matchingMenuItem) {
                activateParentDropdown(matchingMenuItem);
            }
        };
        initMenu();
    }, [props.location.pathname]);

    function activateParentDropdown(item) {
        item.classList.add('active');
        const parent = item.parentElement;

        if (parent) {
            parent.classList.add('mm-active');
            const parent2 = parent.parentElement;

            if (parent2) {
                parent2.classList.add('mm-show');

                const parent3 = parent2.parentElement;

                if (parent3) {
                    parent3.classList.add('mm-active'); // li
                    parent3.childNodes[0].classList.add('mm-active'); //a
                    const parent4 = parent3.parentElement;
                    if (parent4) {
                        parent4.classList.add('mm-active');
                    }
                }
            }
            return false;
        }
        return false;
    }

    return (
        <React.Fragment>
            <div id="sidebar-menu">
                <ul className="metismenu list-unstyled" id="side-menu">
                    <li className="menu-title">APPS</li>
                    {navigation && navigation.map((navigation, idx) => {
                        return (
                            <li key={idx}>
                                <Link
                                    to={navigation.path}
                                    className={(navigation.submenu && navigation.submenu.length > 0)
                                        ? 'has-arrow waves-effect'
                                        : null}
                                >
                                    <i className={navigation.icon}/>
                                    <span>{navigation.title}</span>
                                </Link>
                                {(navigation.submenu && navigation.submenu.length > 0 && navigation.submenu.map((menu, idx) => {
                                    return (
                                        <ul key={idx} className="sub-menu" aria-expanded="false">
                                            <li>
                                                <Link to={menu.path}>{menu.title}</Link>
                                            </li>
                                        </ul>
                                    );
                                }))}
                            </li>
                        );
                    })}
                    {/*<li>*/}
                    {/*<Link to="/#" className="has-arrow waves-effect">*/}
                    {/*<i className="bx bx-store"></i>*/}
                    {/*<span>{props.t('Ecommerce')}</span>*/}
                    {/*</Link>*/}
                    {/*<ul className="sub-menu" aria-expanded="false">*/}
                    {/*<li>*/}
                    {/*<Link to="/ecommerce-products">{props.t('Products')}</Link>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*<Link to="/ecommerce-product-detail">*/}
                    {/*{props.t('Product Detail')}*/}
                    {/*</Link>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*<Link to="/ecommerce-orders">{props.t('Orders')}</Link>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*<Link to="/ecommerce-customers">{props.t('Customers')}</Link>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*<Link to="/ecommerce-cart">{props.t('Cart')}</Link>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*<Link to="/ecommerce-checkout">{props.t('Checkout')}</Link>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*<Link to="/ecommerce-shops">{props.t('Shops')}</Link>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*<Link to="/ecommerce-add-product">*/}
                    {/*{props.t('Add Product')}*/}
                    {/*</Link>*/}
                    {/*</li>*/}
                    {/*</ul>*/}
                    {/*</li>*/}
                </ul>
            </div>
        </React.Fragment>
    );
};

SidebarContent.propTypes = propTypes;
SidebarContent.defaultProps = defaultProps;

export default withRouter(withTranslation()(SidebarContent));
