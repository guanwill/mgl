import jwt from "jsonwebtoken";

export const getAuthenticatedUser = () => {
  let decodedToken = jwt.decode(localStorage.getItem("accessToken"));
  return decodedToken._id
};

export default getAuthenticatedUser;
