import { API } from '../../../_shared/defs/_urls';
import { apiRequest,  FETCH_CLIENTS, GET, } from '../../actions';

const { CLIENTS } = API;


const fetchClients = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === FETCH_CLIENTS.START) {
        const { ...rest } = action.meta;
        dispatch(
            apiRequest({
                method: GET,
                url: `${CLIENTS}`,
                key: 'fetchClients',
                onSuccess: (data) => {
                    dispatch({ type: FETCH_CLIENTS.SUCCESS, payload: data });
                },
                ...rest,
            }),
        );
    }
};



export default [
    fetchClients,
];

