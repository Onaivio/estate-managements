import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Icon = <LoadingOutlined style={{ fontSize: 35 }} spin/>;

const Progress = ({ className, style, message, icon, ...rest }) => (
    <div className="loading" style={style} {...rest}>
        <Spin indicator={icon ? icon : Icon}/>
    </div>
);

const propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    message: PropTypes.string,
};

Progress.propTypes = propTypes;

export default Progress;
