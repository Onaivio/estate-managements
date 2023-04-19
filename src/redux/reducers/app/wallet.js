import _ from 'lodash';
import { arrayToById, byIdToByCreatedAt } from '../../../_shared/functions/util';
import { FETCH_WALLET, FETCH_WALLETS } from '../../actions/app/wallet';

const defaultState = {
    current: null,
    byId: {},
    byList: [],
};

const walletReducer = (state = defaultState, action) => {
    const { payload } = action;
    switch (action.type) {
        case FETCH_WALLET.SUCCESS:
            return _.assign({}, state, { current: action.payload });
        case FETCH_WALLETS.SUCCESS:
            const byId = arrayToById(payload);
            const byList = byIdToByCreatedAt(byId);
            return _.assign({}, state, { byId, byList });
        default:
            return state;
    }
};

export default walletReducer;
