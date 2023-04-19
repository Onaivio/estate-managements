import PropTypes from 'prop-types';
import { Media } from './Media';
import { AppLocation } from './AppLocation';


export const User = {
    _id: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    current_profile_type: PropTypes.string.isRequired,
    current_profile: PropTypes.object.isRequired || PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    account_verified: PropTypes.bool.isRequired,
    verification_code: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    dob: PropTypes.string.isRequired,
    avatar: PropTypes.shape(Media),
    account_type: PropTypes.string.isRequired,
    password_reset: PropTypes.bool,
    password_reset_code: PropTypes.string.isRequired,
    verify_code_expiration: PropTypes.string.isRequired,
    change_password: PropTypes.string.isRequired,
    is_admin: PropTypes.string.isRequired,
    location: PropTypes.shape(AppLocation),
    logo: PropTypes.string.isRequired,
    banner: PropTypes.string.isRequired,
    deleted: PropTypes.bool,
    createdAt: PropTypes.string.isRequired,
    updateAt: PropTypes.string.isRequired,
};
