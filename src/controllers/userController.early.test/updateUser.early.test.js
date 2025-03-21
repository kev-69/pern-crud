


const { updateUser } = require('../userController');
const { 
    updateUserService} = require("../../models/userModel");
jest.mock("../../models/userModel", () => ({
  updateUserService: jest.fn(),
}));

describe('updateUser() updateUser method', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      params: { id: '123' },
      body: { email: 'test@example.com', name: 'Test User' },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  describe('Happy Paths', () => {
    it('should update a user successfully', async () => {
      // Arrange
      const updatedUser = { id: '123', email: 'test@example.com', name: 'Test User' };
      updateUserService.mockResolvedValue(updatedUser);

      // Act
      await updateUser(req, res, next);

      // Assert
      expect(updateUserService).toHaveBeenCalledWith('123', 'test@example.com', 'Test User');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        message: 'User updated successfully',
        data: updatedUser,
      });
    });
  });

  describe('Edge Cases', () => {
    it('should return 404 if user is not found', async () => {
      // Arrange
      updateUserService.mockResolvedValue(null);

      // Act
      await updateUser(req, res, next);

      // Assert
      expect(updateUserService).toHaveBeenCalledWith('123', 'test@example.com', 'Test User');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: 404,
        message: 'User not found',
        data: null,
      });
    });

    it('should handle errors thrown by updateUserService', async () => {
      // Arrange
      const error = new Error('Database error');
      updateUserService.mockRejectedValue(error);

      // Act
      await updateUser(req, res, next);

      // Assert
      expect(updateUserService).toHaveBeenCalledWith('123', 'test@example.com', 'Test User');
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});