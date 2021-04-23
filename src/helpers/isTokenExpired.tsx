import jwt from 'jsonwebtoken';

export const isTokenExpired = () => {
    let decodedToken = jwt.decode(localStorage.getItem('accessToken'));
    if (decodedToken) {
        let actualTimeInSeconds = Date.now();
        let tokenExpiryTimeInSeconds = decodedToken.exp * 1000;
        return tokenExpiryTimeInSeconds < actualTimeInSeconds; //expired
    }
    return true;
};

export default isTokenExpired;
