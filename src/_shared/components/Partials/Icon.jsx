import React from 'react';


const propTypes = {};

const defaultProps = {};

const Icon = props => {

    const { type, className } = props;
    return (
        <>
            {React.createElement(type, { className })}
        </>
    );
};

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;
