import jwt from "jsonwebtoken";

export const isTokenExpired = () => {
  let decodedToken = jwt.decode(localStorage.getItem("accessToken"));
  if (decodedToken) {
    let actualTimeInSeconds = Date.now();
    let tokenExpiryTimeInSeconds = decodedToken.exp * 1000;
    console.log("is expired? ", tokenExpiryTimeInSeconds < actualTimeInSeconds);
    return tokenExpiryTimeInSeconds < actualTimeInSeconds; //expired
  }
  return true
};

export default isTokenExpired;
