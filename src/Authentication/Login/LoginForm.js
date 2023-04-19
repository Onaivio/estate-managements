import React from 'react';
import { Link } from 'react-router-dom';
import lock from '../../Images/lock.png';
import InputField from '../../_shared/components/ReduxFormFields/TextInput';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import Alert from "antd/es/alert";
import { Field, reduxForm } from 'redux-form';




const propTypes = {
    formLoading: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
};

const defaultProps = {
    formLoading: false,
};

const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Please enter your email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    if (!values.password) {
        errors.password = 'Please enter your password';
    } else if (values.password.length < 6) {
        errors.password = 'Password should be 6+ characters';
    }
    return errors;
};


const LoginForm = (props) => {
    const {
        formLoading,
        handleSubmit,
        loginError,
        formData,
    } = props;

    const handleOnSubmit = (e, values) => {
        e.preventDefault();
        handleSubmit(values);
    };
    return (
        <>
            <form name="login-form"
                  onSubmit={handleSubmit}>
                {(loginError && loginError.message) ? (
                    <Alert color="danger">{loginError.message}</Alert>
                ) : null}
                <div className="flex flex-col gap-1">
                    <label className="p-color font-semibold text-xs">
                        Email Address
                    </label>
                    <Field
                        type="email"
                        name="email"
                        disabled={formLoading}
                        component={InputField}
                        className="border border-gray-500 p-2 rounded-md placeholder:text-xs"
                        placeholder="Enter Email Address"
                    />
                </div>

                <div className="mt-4 flex flex-col gap-1">
                    <label
                        className="p-color font-semibold text-xs"
                    >
                        {' '}
                        Password
                    </label>
                    <Field
                        type="password"
                        name="password"
                        disabled={formLoading}
                        component={InputField}
                        className="border border-gray-500 p-2 rounded-md placeholder:text-xs"
                        placeholder="Enter password"
                    />
                </div>

                <div className="flex items-center mt-4 gap-2">
                    <input type="checkbox" name="" id=""/>
                    <label htmlFor="remember" className="text-xs p-color font-medium">
                        Remember Me
                    </label>
                </div>

                <button
                    color="success"
                    disabled={formLoading}
                    onClick={(e) => handleOnSubmit(e, formData.values)}
                    className="button-bg p-2 mt-4 w-full text-white rounded-md"
                >
                    {formLoading ? 'Processing...' : ''}

                    Sign In
                </button>

                <div className="flex items-center justify-center gap-1 mt-4">
                    <img src={lock} alt="" className="h-6 w-6"/>
                    <p>
                        {' '}
                        <Link
                            to="/forgot-password"
                            className="mt-3 text-xs p-color font-medium"
                        >
                            {' '}
                            Forgot your password?
                        </Link>
                    </p>
                </div>
            </form>
        </>

    );
};
LoginForm.propTypes = propTypes;
LoginForm.defaultProps = defaultProps;

const stateProps = ({ form }) => ({
    formData: form.LoginForm,
});
const connectedForm = reduxForm({
    // a unique name for the form
    form: 'LoginForm',
    validate,
})(LoginForm);


export default connect(stateProps, null)(connectedForm);
