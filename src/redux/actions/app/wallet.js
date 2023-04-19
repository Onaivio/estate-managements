import { createActionType } from '../../../_shared/functions/util';


export const FETCH_WALLET = createActionType('FETCH_WALLET', 'Wallet');
export const FETCH_WALLETS = createActionType('FETCH_WALLETS', 'Wallet');

export const fetchWallets = params => ({
    type: FETCH_WALLETS.START,
    meta: { params },
});

export const fetchWallet = (clientId, params = {}) => ({
    type: FETCH_WALLET.START,
    meta: { clientId, params },
});
