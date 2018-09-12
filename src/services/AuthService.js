import API from './api';

class AuthService {
    singup(data){
        return API.post(`MyUsers/signup`, data);
    }
}

export default AuthService;
