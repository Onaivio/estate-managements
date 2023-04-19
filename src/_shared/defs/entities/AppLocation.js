import PropTypes from 'prop-types';

export const AppLocation = {
    street: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    postal_code: PropTypes.string.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.string).isRequired,
    formatted_address: PropTypes.string,
};