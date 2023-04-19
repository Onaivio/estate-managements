import React, { useState, useRef } from 'react';
import {
    DashboardOutlined,
    AppstoreOutlined,
    AntDesignOutlined,
    FileTextOutlined,
    SearchOutlined,
} from '@ant-design/icons';

import { Link } from 'react-router-dom';
import { AutoComplete, Input } from 'antd';
import IntlMessage from '../../common/IntlMessage';

const getOptionList = (navTree, optTree) => {
    optTree = optTree ? optTree : [];
    for (const navItem of navTree) {
        if (navItem.submenu.length === 0) {
            optTree.push(navItem);
        }
        if (navItem.submenu.length > 0) {
            getOptionList(navItem.submenu, optTree);
        }
    }
    return optTree;
};

const navItem = () => {

};
const optionList = getOptionList();

