import jwt from 'jsonwebtoken';

export const getAuthenticatedUser = () => {
    let decodedToken = jwt.decode(localStorage.getItem('accessToken'));
    return decodedToken ? decodedToken._id : null;
};

export default getAuthenticatedUser;
