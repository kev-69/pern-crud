


const { getUserById } = require('../userController');
const { 
    getUserByIdService} = require("../../models/userModel");
jest.mock("../../models/userModel", () => ({
  getUserByIdService: jest.fn(),
}));

describe('getUserById() getUserById method', () => {
  let req, res, next;

  beforeEach(() => {
    req = { params: { id: '1' } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  describe('Happy paths', () => {
    it('should return user data when user is found', async () => {
      // Arrange: Mock the service to return a user object
      const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com' };
      getUserByIdService.mockResolvedValue(mockUser);

      // Act: Call the function
      await getUserById(req, res, next);

      // Assert: Check if the response is correct
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'User retrieved successfully',
        data: mockUser,
      });
    });
  });

  describe('Edge cases', () => {
    it('should return 404 when user is not found', async () => {
      // Arrange: Mock the service to return null
      getUserByIdService.mockResolvedValue(null);

      // Act: Call the function
      await getUserById(req, res, next);

      // Assert: Check if the response is correct
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: 404,
        message: 'User not found',
        data: null,
      });
    });

    it('should call next with error when service throws an error', async () => {
      // Arrange: Mock the service to throw an error
      const error = new Error('Database error');
      getUserByIdService.mockRejectedValue(error);

      // Act: Call the function
      await getUserById(req, res, next);

      // Assert: Check if next was called with the error
      expect(next).toHaveBeenCalledWith(error);
    });

    it('should handle invalid id format gracefully', async () => {
      // Arrange: Set an invalid id format
      req.params.id = 'invalid-id';

      // Act: Call the function
      await getUserById(req, res, next);

      // Assert: Check if the service was called with the invalid id
      expect(getUserByIdService).toHaveBeenCalledWith('invalid-id');
    });
  });
});