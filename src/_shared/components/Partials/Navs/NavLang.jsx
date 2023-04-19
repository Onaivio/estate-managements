import React from 'react';
import { CheckOutlined, GlobalOutlined, DownOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import lang from '../../../../assets/data/language.data.json';
import { connect } from 'react-redux';
import { uiChangeLocale } from '../../../../redux/actions/index';
import PropTypes from 'prop-types';

const propTypes = {
    uiChangeLocale: PropTypes.func,
};

const defaultProps = {
    locale: 'en',
};


function getLanguageDetails(locale) {
    const data = lang.filter(element => element.langId === locale);
    return data[0];
}

const SelectedLanguage = ({ locale }) => {
    const language = getLanguageDetails(locale);
    const { langName, icon } = language;
    return (
        <div className="d-flex align-items-center">
            <img style={{ maxHeight: '20px' }} src={`/img/flags/${icon}.png`} alt={langName}/>
            <span className="font-weight-semibold ml-2">{langName} <DownOutlined className="font-size-xs"/></span>
        </div>
    );
};

const NavLang = ({ locale, configDisplay, uiChangeLocale }) => {
    const langOption = (
        <Menu>
            {
                lang.map((elem, idx) => {
                    return (
                        <Menu.Item
                            key={idx}
                            className={locale === elem.langId ? 'ant-dropdown-menu-active' : ''}
                            onClick={() => uiChangeLocale(elem.langId)}>
                            <span className="d-flex justify-content-between align-items-center">
                                <div>
                                    <img style={{ maxWidth: '20px' }} src={`/img/flags/${elem.icon}.png`}
                                         alt={elem.langName}/>
                                    <span className="font-weight-normal ml-2">{elem.langName}</span>
                                </div>
                                {locale === elem.langId ? <CheckOutlined className="text-success"/> : null}
                            </span>
                        </Menu.Item>
                    );
                })
            }
        </Menu>
    );
    return (
        <Dropdown placement="bottomRight" overlay={langOption} trigger={['click']}>
            {
                configDisplay ? (
                        <a href="#/">
                            <SelectedLanguage locale={locale}/>
                        </a>
                    )
                    : (
                        <Menu mode="horizontal">
                            <Menu.Item>
                                <a href="#/" onClick={e => e.preventDefault()}>
                                    <GlobalOutlined className="nav-icon mr-0"/>
                                </a>
                            </Menu.Item>
                        </Menu>
                    )
            }
        </Dropdown>
    );
};
NavLang.propTypes = propTypes;
NavLang.defaultProps = defaultProps;

const stateProps = ({ ui }) => ({
    locale: ui.locale,
});

const dispatchProps = {
    uiChangeLocale,
};

export default connect(stateProps, dispatchProps)(NavLang);
