import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import useOTP from '../../lib/UseOTP';

const OtpInput = ({
                      OTPLength,
                      disabled,
                      autoFocus,
                      value = '',
                      onChange,
                      otpType,
                      secure,
                      className,
                      inputClassName,
                      inputStyle: inputStyles,
                      style,
                  }) => {

    const {
        activeInput,
        getOtpValue,
        handleOnChange,
        handleOnKeyDown,
        handleOnInput,
        handleOnPaste,
        onInputFocus,
    } = useOTP({ autoFocus, value, otpType, onChange, OTPLength });

    const renderInputs = useMemo(() => {
        const otp = getOtpValue();
        const inputs = [];

        for (let index = 0; index < OTPLength; index++) {
            inputs.push(
                <Input
                    className={inputClassName}
                    style={inputStyles}
                    key={index}
                    value={otp[index]}
                    focus={activeInput === index}
                    onChange={handleOnChange}
                    onKeyDown={handleOnKeyDown}
                    onInput={handleOnInput}
                    onInputFocus={onInputFocus}
                    index={index}
                    disabled={disabled}
                    autoFocus={autoFocus}
                    secure={secure}
                    data-testid="input"
                    otpType={otpType}
                />,
            );
        }
        return inputs;
    }, [
        getOtpValue,
        OTPLength,
        inputClassName,
        inputStyles,
        activeInput,
        handleOnChange,
        handleOnKeyDown,
        handleOnInput,
        handleOnPaste,
        onInputFocus,
        disabled,
        autoFocus,
        secure,
    ]);
    return (
        <div
            style={{ display: 'flex', ...style }}
            className={`${className}`}
            data-testid="otp-input-root">
            {renderInputs}
        </div>
    );
};

OtpInput.propType = {
    className: PropTypes.string,
    inputClassName: PropTypes.string,
    OTPLength: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    autoFocus: PropTypes.bool,
    secure: PropTypes.bool,
    otpType: PropTypes.oneOfType(['number', 'alpha', 'alphanumeric', 'any']),
    inputStyles: PropTypes.object,
    style: PropTypes.object,
};

OtpInput.defaultProps = {
    className: '',
    inputClassName: '',
    OTPLength: 4,
    onChange: () => {
    },
    disabled: false,
    autoFocus: false,
    value: '',
    otpType: 'any',
    inputStyles: {},
    style: {},
};

export default OtpInput;
