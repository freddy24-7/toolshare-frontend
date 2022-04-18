import {SIGN_IN_URL, SIGN_UP_URL, BASE_API_URL} from '../backend-urls/constants'
import axios from 'axios';

class RegistrationService {

    login(user) {
        return axios.post(SIGN_IN_URL, user);
    }

    register(user) {
        return axios.post(SIGN_UP_URL, user);
    }
    getUsers(){
        return axios.get(BASE_API_URL + '/users');
    }

}

export default new RegistrationService();
