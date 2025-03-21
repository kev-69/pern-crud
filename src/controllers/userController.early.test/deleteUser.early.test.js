


const { deleteUser } = require('../userController');
const { 
    deleteUserService
} = require("../../models/userModel");
jest.mock("../../models/userModel", () => ({
  deleteUserService: jest.fn(),
}));

describe('deleteUser() deleteUser method', () => {
  let req, res, next;

  beforeEach(() => {
    req = { params: { id: '123' } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  describe('Happy Paths', () => {
    it('should delete a user successfully and return a 200 status', async () => {
      // Arrange
      deleteUserService.mockResolvedValue({ id: '123', name: 'John Doe' });

      // Act
      await deleteUser(req, res, next);

      // Assert
      expect(deleteUserService).toHaveBeenCalledWith('123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'User deleted successfully',
        data: { id: '123', name: 'John Doe' },
      });
    });
  });

  describe('Edge Cases', () => {
    it('should return a 404 status if the user is not found', async () => {
      // Arrange
      deleteUserService.mockResolvedValue(null);

      // Act
      await deleteUser(req, res, next);

      // Assert
      expect(deleteUserService).toHaveBeenCalledWith('123');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: 404,
        message: 'User not found',
        data: null,
      });
    });

    it('should call next with an error if deleteUserService throws an error', async () => {
      // Arrange
      const error = new Error('Database error');
      deleteUserService.mockRejectedValue(error);

      // Act
      await deleteUser(req, res, next);

      // Assert
      expect(deleteUserService).toHaveBeenCalledWith('123');
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});