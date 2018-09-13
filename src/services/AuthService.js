import API from './api';

class AuthService {
    singup(data){
        return API.post(`MyUsers/signup`, data);
    }

    login(data) {
        return API.post(`MyUsers/login`, data);
    }
}

export default AuthService;
