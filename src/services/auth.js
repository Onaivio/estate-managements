import jwtDecode from 'jwt-decode';
import store from '../redux/store';

/**
 * Auth Service for getting sessions
 * */
class AuthService {
    /**
     * @constructor
     * */
    constructor() {
        this.getUserSession = this.getUserSession.bind(this);
        this.isLoggedIn = this.isLoggedIn.bind(this);
    }

    /**
     * get user session from the state
     * */
    getUserSession() {
        const { getState } = store;
        const { app } = getState();
        return app.user.session;
    }

    /**
     * check auth token session
     * */
    isLoggedIn() {
        const token = this.getUserSession();
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const sessionTimExp = decoded.exp;
                return sessionTimExp > new Date().getDate() / 1000;
            } catch (e) {
                console.log('token decode error ', e.message);
                return false;
            }
        }
        return false;
    }
}

export default new AuthService();
