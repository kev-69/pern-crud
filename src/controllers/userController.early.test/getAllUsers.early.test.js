


const { getAllUsers } = require('../userController');
const { 
    getAllUserService} = require("../../models/userModel");
jest.mock("../../models/userModel", () => ({
  getAllUserService: jest.fn(),
}));

describe('getAllUsers() getAllUsers method', () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  describe('Happy paths', () => {
    it('should return a 200 status and a list of users when users are retrieved successfully', async () => {
      // Arrange: Mock the service to return a list of users
      const mockUsers = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
      getAllUserService.mockResolvedValue(mockUsers);

      // Act: Call the getAllUsers function
      await getAllUsers(req, res, next);

      // Assert: Check that the response is correct
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Users retrieved successfully',
        data: mockUsers,
      });
    });
  });

  describe('Edge cases', () => {
    it('should handle the case where no users are found and return an empty array', async () => {
      // Arrange: Mock the service to return an empty array
      getAllUserService.mockResolvedValue([]);

      // Act: Call the getAllUsers function
      await getAllUsers(req, res, next);

      // Assert: Check that the response is correct
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'Users retrieved successfully',
        data: [],
      });
    });

    it('should call next with an error if the service throws an error', async () => {
      // Arrange: Mock the service to throw an error
      const error = new Error('Database error');
      getAllUserService.mockRejectedValue(error);

      // Act: Call the getAllUsers function
      await getAllUsers(req, res, next);

      // Assert: Check that next was called with the error
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});