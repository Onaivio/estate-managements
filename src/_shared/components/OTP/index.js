import React, { useState } from 'react';
import OTPInput from './OTPReader';

export default ({ title = '', disabled, style, ...rest }) => {
    const [OTP, setOtp] = useState('');
    console.log('otp::', OTP);
    return (
        <div
            style={{ padding: 12 }}>
            <div style={{ marginBottom: 12 }}>
                <span style={{marginLeft: 20}}> {title} </span>
            </div>
            <OTPInput
                style={style}
                value={OTP}
                onChange={setOtp}
                disabled={disabled}
                otpType="number"
                {...rest}
            />
        </div>
    );
};


