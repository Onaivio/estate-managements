import React from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import { connect } from 'react-redux';
import {
    EditOutlined,
    SettingOutlined,
    ShopOutlined,
    QuestionCircleOutlined,
    LogoutOutlined,
} from '@ant-design/icons';

import Icon from '../Icon';

const propTypes = {};

const defaultProps = {};

const menuItem = (module = 'admin') => {
    return [
        {
            title: 'Edit Profile',
            icon: EditOutlined,
            path: `/${module}/edit-profile`,
            roles: ['admin', 'app', 'employee'],
        },
        {
            title: 'Account Setting',
            icon: SettingOutlined,
            path: `/${module}/settings`,
            roles: ['admin', 'app'],
        },
        {
            title: 'Billing',
            icon: ShopOutlined,
            path: `/${module}/billings`,
            roles: ['admin'],
        },
        {
            title: 'Help Center',
            icon: QuestionCircleOutlined,
            path: `/${module}/help-center`,
            roles: ['admin'],
        },
    ].filter(item => item.roles.includes(module));
};

const NavProfile = (props) => {

    const { match } = props;
    console.log('nav-profile-params', match);

    const handleSignOut = e => {
        e.preventDefault();
        console.log('sign out');
    };


    const profileImg = '/img/avatars/thumb-1.jpg';
    const profileMenu = (
        <div className="nav-profile nav-dropdown">
            <div className="nav-profile-header">
                <div className="d-flex">
                    <Avatar size={45} src={profileImg}/>
                    <div className="pl-3">
                        <h4 className="mb-0">Charlie Howard</h4>
                        <span className="text-muted">Frontend Developer</span>
                    </div>
                </div>
            </div>
            <div className="nav-profile-body">
                <Menu>
                    {menuItem().map((el, i) => {
                        return (
                            <Menu.Item key={i}>
                                <a href={el.path}>
                                    <Icon className="mr-3" type={el.icon}/>
                                    <span className="font-weight-normal">{el.title}</span>
                                </a>
                            </Menu.Item>
                        );
                    })}
                    <Menu.Item key={menuItem.length + 1} onClick={e => handleSignOut(e)}>
            <span>
              <LogoutOutlined className="mr-3"/>
              <span className="font-weight-normal">Sign Out</span>
            </span>
                    </Menu.Item>
                </Menu>
            </div>
        </div>
    );
    return (
        <Dropdown placement="bottomRight" overlay={profileMenu} trigger={['click']}>
            <Menu className="d-flex align-item-center" mode="horizontal">
                <Menu.Item>
                    <Avatar src={profileImg}/>
                </Menu.Item>
            </Menu>
        </Dropdown>
    );
};

NavProfile.propTypes = propTypes;
NavProfile.defaultProps = defaultProps;

export default connect(null, null)(NavProfile);
