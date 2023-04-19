import {
    apiRequest,
    GET,
} from '../../actions/index';
import { API } from '../../../_shared/defs/_urls';
import { FETCH_WALLET, FETCH_WALLETS } from '../../actions/app/wallet';



const fetchWallet = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === FETCH_WALLET.START) {
        const { clientId, ...rest } = action.meta;
        dispatch(
            apiRequest({
                method: GET,
                url: `${API.WALLETS}/${clientId}/client`,
                key: 'fetchWallet',
                onSuccess: (data) => {
                    console.log('wallet-data:', data);
                    dispatch({ type: FETCH_WALLET.SUCCESS, payload: data });
                },
                ...rest,
            }),
        );
    }
};

const fetchWallets = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === FETCH_WALLETS.START) {
        const { ...rest } = action.meta;
        dispatch(
            apiRequest({
                method: GET,
                url: `${API.WALLETS}`,
                key: 'fetchWallets',
                onSuccess: (data) => {
                    console.log('wallets-data:', data);
                    dispatch({ type: FETCH_WALLETS.SUCCESS, payload: data });
                },
                ...rest,
            }),
        );
    }
};


export default [
    fetchWallet,
    fetchWallets,
];

