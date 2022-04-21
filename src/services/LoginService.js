import axios from 'axios';
import {SIGN_IN_URL} from '../backend-urls/constants'

class LoginService {

    register(user) {
        return axios.post(SIGN_IN_URL, user);
    }
}

export default new LoginService;
