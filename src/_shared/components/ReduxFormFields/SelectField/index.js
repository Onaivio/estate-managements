import React from 'react';
import Select from 'react-select';

export default ({
                    options,
                    name,
                    label,
                    placeholder,
                    disabled,
                    isSearchable,
                    input,
                    meta: { touched, error, warning },
                    className,
                    children,
                    ...rest
                }) => {
    return (
        <>
            {label && <label className="form-label">{label}</label>}
            <div>
                <Select
                    {...input}
                    blurInputOnSelect={false}
                    isClearable={true}
                    openMenuOnClick={true}
                    openMenuOnFocus={true}
                    hideSelectedOptions={true}
                    placeholder={placeholder}
                    className={className}
                    classNamePrefix="react-select"
                    name={name}
                    isSearchable={isSearchable || false}
                    options={options}
                    value={input.value}
                    onChange={selected => input.onChange(selected)}
                    onBlur={e => e.preventDefault()}
                    isDisabled={disabled}
                />
            </div>
            {touched && error && (
                <div className="invalid-feedback d-block">{error}</div>
            )}
        </>
    );
};
