import React from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';
import { LoadingOutlined } from '@ant-design/icons';


const Icon = <LoadingOutlined style={{ fontSize: 35 }} spin/>;

const propTypes = {
    size: PropTypes.string,
    cover: PropTypes.string,
};

const defaultProps = {
    align: 'center',
    cover: 'inline',
};

const Loading = props => {
    const { align, cover } = props;
    return (
        <div id="preloader">
            <div id="status">
                <div className="spinner-chase">
                    <div className="chase-dot"/>
                    <div className="chase-dot"/>
                    <div className="chase-dot"/>
                    <div className="chase-dot"/>
                    <div className="chase-dot"/>
                    <div className="chase-dot"/>
                </div>
            </div>
        </div>
    );
};

Loading.propTypes = propTypes;
Loading.defaultProps = defaultProps;

export default Loading;
