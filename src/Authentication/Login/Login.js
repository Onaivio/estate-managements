import React, { useEffect } from 'react';
import userIcon from '../../Images/usericon.png';
import LoginForm from "./LoginForm";
import store from '../../redux/store';
import { login } from '../../redux/actions/app';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';





const propTypes = {
    isSubmitting: PropTypes.bool,
    login: PropTypes.func.isRequired,
};

const defaultProps = {
    isSubmitting: false,
};

const Login = props => {
    const { login, isSubmitting, error } = props;
    useEffect(() => {
        store.dispatch({ type: 'RESET_APP_STATE' });
        localStorage.removeItem('cart');
    }, []);

    const handleSubmit = values => {
        login(values);
    };


    return (
    <div className="w-full bg-white  flex justify-center items-center h-screen">
      <div className="flex flex-col w-3/12 justify-center shad">
        <div className="p-6 bg-top relative">
          <h4 className="color-theme">Welcome Backa !</h4>
          <p className="color-theme">Sign in to continue to dashboard</p>

          <img src={userIcon} alt="" className=" w-12 h-12 absolute top-24" />
        </div>
        <div className="bg-white p-6 md:mt-12">
            <LoginForm
                handleSubmit={handleSubmit}
                formLoading={isSubmitting}
                loginError={error}

            />
        </div>
      </div>
    </div>
  );
};
Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

const stateProps = ({ ui }) => ({
    isSubmitting: ui.loading.login,
    error: ui.errors.login,
});

const dispatchProps = {
    login,
};

export default connect(stateProps, dispatchProps)(Login);
