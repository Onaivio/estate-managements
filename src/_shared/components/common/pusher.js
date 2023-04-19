import * as Pusher from 'pusher-js';

export default new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
    cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
    encrypted: true,
});
