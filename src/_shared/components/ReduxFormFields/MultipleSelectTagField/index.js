import React, { Fragment, useState } from 'react';
import { FormFeedback } from 'reactstrap';
import OutsideClickHandler from 'react-outside-click-handler';
import Select from 'react-select';
import PropTypes from 'prop-types';

const propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    name: PropTypes.string.isRequired,
};

const MultipleSelectField = ({
                                 options,
                                 name,
                                 label,
                                 placeholder,
                                 disabled,
                                 isMulti,
                                 height,
                                 isSearchable = true,
                                 input,
                                 className,
                                 children,
                                 length,
                                 meta: { touched, error, warning },
                                 ...rest
                             }) => {
    if (length && Number.isInteger(length)) {
        rest.minLength = length;
        rest.maxLength = length;
    }

    const [handleChange, setHandleChange] = useState('');
    const [data, setData] = useState([]);
    const [showInput, setShowInput] = useState(false);

    const pushData = selected => {
        setHandleChange(selected);
        setData(prev => prev.concat(selected));
        input.onChange(data);
        setHandleChange('');
        setShowInput(false);
    };

    const popData = index => {
        const val = data.filter((item, idx) => idx !== index);
        input.onChange(val);
        setData(val);
    };

    const val = input.onChange(data);

    return (
        <Fragment>
            {label && (
                <label className="form-label d-flex justify-content-between">
                    <span className="label">{label}</span>
                    {!showInput && (
                        <span className="add-btn" onClick={() => setShowInput(!showInput)}>
                            <span className="add-icon d-inline-flex justify-content-center align-items-center">
                                <i className="fa fa-plus"/>
                            </span>{' '}
                            {label}
                        </span>
                    )}
                </label>
            )}
            {showInput && (
                <OutsideClickHandler onOutsideClick={() => setShowInput(false)}>
                    <div className="mb-3">
                        <Select
                            {...input}
                            blurInputOnSelect={false}
                            openMenuOnClick={true}
                            openMenuOnFocus={true}
                            hideSelectedOptions={true}
                            placeholder={placeholder}
                            className="selectbox-container"
                            classNamePrefix="react-select"
                            name={name}
                            isSearchable={true}
                            options={options}
                            onChange={selected => pushData(selected)}
                            onBlur={e => e.preventDefault()}
                            isDisabled={disabled}
                        />
                    </div>
                </OutsideClickHandler>
            )}
            <div className="multi-values p-2">
                {data && data.length === 0 ? (
                    <small>no {label ? label : 'Item'} added yet</small>
                ) : (
                    data.map(({ label }, index) => (
                        <div key={index} className="d-inline-flex mr-2 mb-2">
                            <div>{label}</div>
                            <div
                                className="css-xb97g8 react-select__multi-value__remove ml-2"
                                onClick={() => popData(index)}
                            >
                                <svg
                                    height="14"
                                    width="14"
                                    viewBox="0 0 20 20"
                                    aria-hidden="true"
                                    focusable="false"
                                    className="css-6q0nyr-Svg"
                                >
                                    <path
                                        d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"/>
                                </svg>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {touched && error && (
                <FormFeedback className="d-block">{error}</FormFeedback>
            )}
        </Fragment>
    );
};

MultipleSelectField.propTypes = propTypes;

export default MultipleSelectField;
