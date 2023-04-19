import { createActionType } from '../../../_shared/functions/util';


export const FETCH_CLIENTS = createActionType('FETCH_CLIENTS', 'Client');


export const fetchClients = params => ({
    type: FETCH_CLIENTS.START,
    meta: { params },
});

