import {SIGN_UP_URL, SIGN_IN_URL} from '../backend-urls/constants'
import axios from 'axios';

class RegistrationService {

    register(user) {
        return axios.post(SIGN_UP_URL, user);
    }
    register(user) {
        return axios.post(SIGN_IN_URL, user);
    }
}

export default new RegistrationService();



