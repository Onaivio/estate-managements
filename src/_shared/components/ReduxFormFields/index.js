import React, { Fragment, useState } from 'react';
// import OutsideClickHandler from 'react-outside-click-handler';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import classNames from 'classnames';
import { FormFeedback, Input } from 'reactstrap';
import './style.scss';


export const TextInputField = ({
                                   className,
                                   input,
                                   disabled,
                                   length,
                                   meta: { touched, error, warning },
                                   ...rest
                               }) => {

    if (length && Number.isInteger(length)) {
        rest.maxLength = length;
        rest.minLength = length;
    }
    return (
        <Fragment>
            <Input
                {...rest}
                {...input}
                disabled={disabled}
                className={classNames('form-control', className, {
                    'is-invalid': touched && error,
                })}
            />
            {touched && error && (
                <FormFeedback className="d-block">{error}</FormFeedback>
            )}
        </Fragment>
    );
};


export const TextAreaInputField = ({
                                   className,
                                   input,
                                   disabled,
                                   length,
                                   meta: { touched, error, warning },
                                   ...rest
                               }) => {

    if (length && Number.isInteger(length)) {
        rest.maxLength = length;
        rest.minLength = length;
    }
    return (
        <Fragment>
            <textarea
                {...rest}
                {...input}
                disabled={disabled}
                className={classNames('form-control', className, {
                    'is-invalid': touched && error,
                })}
            />
            {touched && error && (
                <FormFeedback className="d-block">{error}</FormFeedback>
            )}
        </Fragment>
    );
};
