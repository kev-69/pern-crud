


const { createUser } = require('../userController');
const { 
    getUserByEmailService,
    createUserService} = require("../../models/userModel");
jest.mock("../../models/userModel");

describe('createUser() createUser method', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {
                email: 'test@example.com',
                name: 'Test User'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    describe('Happy Paths', () => {
        it('should create a new user successfully when user does not exist', async () => {
            // Arrange
            getUserByEmailService.mockResolvedValue(null);
            createUserService.mockResolvedValue({ id: 1, email: 'test@example.com', name: 'Test User' });

            // Act
            await createUser(req, res, next);

            // Assert
            expect(getUserByEmailService).toHaveBeenCalledWith('test@example.com');
            expect(createUserService).toHaveBeenCalledWith('test@example.com', 'Test User');
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                status: 201,
                message: 'User created successfully',
                data: { id: 1, email: 'test@example.com', name: 'Test User' }
            });
        });
    });

    describe('Edge Cases', () => {
        it('should return 400 if user already exists', async () => {
            // Arrange
            getUserByEmailService.mockResolvedValue({ id: 1, email: 'test@example.com', name: 'Test User' });

            // Act
            await createUser(req, res, next);

            // Assert
            expect(getUserByEmailService).toHaveBeenCalledWith('test@example.com');
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                status: 400,
                message: 'User already exists',
                data: null
            });
        });

        it('should handle database unique constraint error gracefully', async () => {
            // Arrange
            getUserByEmailService.mockResolvedValue(null);
            const error = new Error();
            error.code = '23505';
            createUserService.mockRejectedValue(error);

            // Act
            await createUser(req, res, next);

            // Assert
            expect(createUserService).toHaveBeenCalledWith('test@example.com', 'Test User');
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                status: 400,
                message: 'User already exists',
                data: null
            });
        });

        it('should call next with error if an unexpected error occurs', async () => {
            // Arrange
            const error = new Error('Unexpected error');
            getUserByEmailService.mockRejectedValue(error);

            // Act
            await createUser(req, res, next);

            // Assert
            expect(next).toHaveBeenCalledWith(error);
        });
    });
});