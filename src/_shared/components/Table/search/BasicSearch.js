import React from 'react';
import { Input } from 'antd';

export const BasicSearch = ({ onSearch, placeHolder }) => {
    const handleSearch = (value) => {
        console.log('search-value:', value);
        // onSearch(input.value);
    };
    return (
        <div className="card-options">
            <Input.Search
                placeholder={placeHolder}
                className="form-control form-control-sm"
                type="text"
                style={{ marginRight: 10 }}
                onSearch={handleSearch}
            />
        </div>
    );
};
