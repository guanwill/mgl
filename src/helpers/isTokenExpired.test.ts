
import isTokenExpired from './isTokenExpired';

describe("isTokenExpired", () => {
    it("should return true if token is expired", async () => {
        let mockJWT = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ0ZXN0IiwiaWF0IjoxNTU1NzU2MDQyLCJleHAiOjE1ODczNzg0NDIsImF1ZCI6InRlc3R0ZXN0Iiwic3ViIjoidGVzdCIsImFjY2Vzc1Rva2VuIjoidGVzdDEyMyJ9.D6BCKyQah_SgDklO1IIX8ydFh5g3i2wKVybMOSYtmqU";
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(mockJWT);
        const getUser = isTokenExpired();
        expect(localStorage.getItem).toHaveBeenCalled();
        expect(getUser).toEqual(true);
        jest.clearAllMocks();
    });
})