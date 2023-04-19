import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const inputDefaultStyles = {
    width: 70,
    height: 70,
    textAlign: 'center',
    marginLeft: 20,
};


const Input = ({
                   focus,
                   autoFocus,
                   disabled,
                   value,
                   onInputFocus,
                   index,
                   secure,
                   style,
                   otpType,
                   ...rest
               }) => {


    const input = useRef(null);
    const componentMounted = useRef(false);
    useEffect(() => {
        if (autoFocus && focus) {
            input.current.focus();
        }
    }, []);

    useEffect(() => {
        if (componentMounted.current && focus) {
            input.current.focus();
        }
    }, [focus]);

    const handleInputFocus = event => onInputFocus(index, event);
    let inputType = 'text';
    if (secure) {
        inputType = 'password';
    } else if (otpType === 'number') {
        inputType = 'tel';
    }
    return (
        <input
            style={{ ...inputDefaultStyles, ...style }}
            type={inputType}
            maxLength="1"
            ref={input}
            disabled={disabled}
            onFocus={handleInputFocus}
            value={value || ''}
            {...rest}
        />
    );
};

Input.propTypes = {
    focus: PropTypes.bool,
    autoFocus: PropTypes.bool,
    numInputs: PropTypes.number,
    index: PropTypes.number.isRequired,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    value: PropTypes.string,
    secure: PropTypes.bool,
    style: PropTypes.object,
    otpType: PropTypes.oneOfType(['number', 'alpha', 'alphanumeric', 'any']),
};

export default React.memo(Input);
