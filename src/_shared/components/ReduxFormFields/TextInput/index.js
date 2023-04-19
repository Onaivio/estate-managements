import React, { Fragment } from 'react';
import classNames from 'classnames';
import { FormFeedback, Input } from 'reactstrap';

export default ({
                    className,
                    input,
                    disabled,
                    length,
                    meta: { touched, error, warning },
                    ...rest
                }) => {
    if (length && Number.isInteger(length)) {
        rest.minLength = length;
        rest.maxLength = length;
    }
    return (
        <Fragment>
            <Input
                {...input}
                {...rest}
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
