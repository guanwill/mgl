import getAuthenticatedUser from './getAuthenticatedUser';

describe('getAuthenticatedUser', () => {
    it('should return _id if jwt has _id property', async () => {
        let mockJWT =
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ0ZXN0IiwiaWF0IjoxNjE4OTE0NDQyLCJleHAiOjE2NTA0NTA0NDIsImF1ZCI6InRlc3R0ZXN0Iiwic3ViIjoidGVzdCIsIkdkaXZlbk5hbWUiOiJ0ZXN0IiwiX2lkIjoidGVzdGlkIn0.JQ13OiQB-Qgv5Vz4QVxsq6t4bcyvc8PrE8diWmFMIaA';
        let _id = 'testid';
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(mockJWT);
        const getUser = getAuthenticatedUser();
        expect(localStorage.getItem).toHaveBeenCalled();
        expect(getUser).toEqual(_id);
        jest.clearAllMocks();
    });
});
