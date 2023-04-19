import React, { useEffect, useState } from 'react';
import { useTimer } from 'react-timer-hook';


const Timer = ({ expiryTimestamp, restartTime = null, text = 'Updating Price', handleExpired = null }) => {
    const [isExpired, setExpired] = useState(false);
    const {
        seconds,
        minutes,
        start,
        restart,
    } = useTimer({
        expiryTimestamp, onExpire: () => {
            console.log('onExpire called');
            setExpired(true);
            handleExpired(true);
        },
    });

    useEffect(() => {
        start();
    }, []);

    useEffect(() => {
        if (isExpired) {
            restart(restartTime);
        }
    }, [isExpired]);
    return (
        <>
            <span style={{ color: '#0a72ff' }}>{text}:{minutes}:{seconds}</span>
        </>
    );
};

export default Timer;
