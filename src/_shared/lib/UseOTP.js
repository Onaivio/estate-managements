import { useState } from 'react';

const UPPER_A_KEY_CODE = 65;
const LOWER_Z_KEY_CODE = 122;

const ZERO_KEY_CODE = 48;
const NINE_KEY_CODE = 57;

const useOTP = ({ authFocus, value, otpType, onChange, OTPLength }) => {
    const [activeInput, setActiveInput] = useState(authFocus ? 0 : -1);

    const getOtpValue = () => (value ? value.toString().split('') : []);

    // Helper to return OTP from input
    const handleOtpChange = otp => {
        let otpValue = otp.join('');
        onChange(otpValue);
    };

    // Focus on input by index
    const focusInput = input => {
        const nextActiveInput = Math.max(Math.min(OTPLength - 1, input), 0);
        setActiveInput(nextActiveInput);
    };
    const focusInputByDirection = (direction = 'next') => {
        focusInput(direction === 'next' ? activeInput + 1 : activeInput - 1);
    };

    // Change OTP value at focused input
    const changeActiveInputValue = ([nextValue]) => {
        const otp = getOtpValue();
        otp[activeInput] = nextValue;
        handleOtpChange(otp);
    };

    // Handle pasted OTP
    const handleOnPaste = (e, data) => {
        e.preventDefault();
        const otp = getOtpValue();

        // Get pastedData in an array of max size
        const clipboardData =
            process.env.NODE_ENV === 'test'
                ? data.slice(0, OTPLength - activeInput).split('')
                : e.clipboardData
                    .getData('text/plain')
                    .slice(0, OTPLength - activeInput)
                    .split('');

        // Paste data from focused input onwards
        for (let pos = 0; pos < OTPLength; ++pos) {
            if (pos >= activeInput && clipboardData.length > 0) {
                otp[pos] = clipboardData.shift();
            }
        }

        // Pass copied value through onChange rules
        let filteredOtpValue = [otp.length];
        let validaCharIndex = 0;
        for (let charIndex = 0; charIndex < otp.length; ++charIndex) {
            if (isValidateChar(otp[charIndex])) {
                filteredOtpValue[validaCharIndex] = otp[charIndex];
                validaCharIndex++;
            }
        }
        handleOtpChange(filteredOtpValue);
    };

    const isValidateChar = char => {
        switch (otpType) {
            case 'number':
                return !(
                    char.charCodeAt(0) > NINE_KEY_CODE || char.charCodeAt(0) < ZERO_KEY_CODE
                );
            case 'alpha':
                return !(
                    char.charCodeAt(0) > LOWER_Z_KEY_CODE ||
                    char.charCodeAt(0) < UPPER_A_KEY_CODE
                );
            case 'alphanumeric':
                return !(
                    char.charCodeAt(0) > LOWER_Z_KEY_CODE ||
                    char.charCodeAt(0) < ZERO_KEY_CODE
                );
            default:
                return true;
        }
    };

    const handleOnChange = evt => {
        if (isValidateChar(evt.target.value)) {
            changeActiveInputValue(evt.target.value);
            focusInputByDirection('next');
        }
    };

    const handleOnKeyDown = evt => {
        const str = '';
        switch (evt.key) {
            case 'Backspace':
                evt.preventDefault();
                changeActiveInputValue(str);
                focusInputByDirection('prev');
                break;
            case 'Delete':
                evt.preventDefault();
                changeActiveInputValue(str);
                break;
            case 'ArrowLeft':
                evt.preventDefault();
                focusInputByDirection('prev');
                break;
            case 'ArrowRight':
                evt.preventDefault();
                focusInputByDirection('next');
                break;
            default:
                break;
        }
    };

    const handleOnInput = evt => {
        if (evt.target.value.length > 1) {
            evt.preventDefault();
            focusInputByDirection('next');
        }
    };

    const onInputFocus = (index, event) => {
        setActiveInput(index);
        event.target.select();
    };

    return {
        activeInput,
        getOtpValue,
        handleOnChange,
        handleOnKeyDown,
        handleOnInput,
        handleOnPaste,
        onInputFocus,
    };
};

export default useOTP;
