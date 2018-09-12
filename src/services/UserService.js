class UserService {
    isLoggedIn = false;
    roles = [];

    setUserData(data) {
        let {token, user, companyId} = data;
        localStorage.setItem('token', token);
        localStorage.setItem('companyId', companyId);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    isAuthenticated() {
        return this.isLoggedIn;
    }

    getRoles() {
        return JSON.parse(localStorage.getItem('roles'));
    }

    setRoles(roles) {
        this.roles = [...this.roles, ...roles];
        localStorage.setItem('roles', JSON.stringify(this.roles));
    }

    getToken() {
        return '';
    }

    getCompanyId() {
        return localStorage.getItem('companyId');
    }

    getUserId() {
        let userData = '';
        try {
            userData = JSON.parse(window.localStorage['userData']);
        } catch (err) {
            console.log(err);
        }
        return userData ? userData.id : '';
    }
}

export default new UserService();
