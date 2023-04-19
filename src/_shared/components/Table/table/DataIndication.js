import React from 'react';


export const NoDataIndication = ({ data = [], loading }) => (
    <div className="spinner">
        {loading ? 'Loading...' : 'No data available'}
    </div>
);
