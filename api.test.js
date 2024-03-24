const request = require('supertest');
const app = require('./app'); // Assuming your Express app is in app.js
const userModel =require("./model/usermodel")

describe('POST /v1/user-signup', () => {
    it('should return 200 and a success message on successful signup', async () => {
        const userData = {
            username: 'user1511',
            firstname: 'John',
            lastname: 'Doe',
            emailid: 'test@example.com',
            password: 'Password@123',
            confirmpassword: 'Password@123',
            phonenumber: 1234567890
        };
    
        const response = await request(app)
            .post('/v1/user-signup')
            .send(userData);
    
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('User registered successfully');
        expect(response.body.data.username).toBe(userData.username);
    });
    it('should return 400 if passwords do not match', async () => {
        const userData = {
            username: 'user1511',
            firstname: 'John',
            lastname: 'Doe',
            emailid: 'test@example.com',
            password: 'Password@123',
            confirmpassword: 'Password@456', // Incorrect confirm password
            phonenumber: 1234567890
        };

        const response = await request(app)
            .post('/v1/user-signup')
            .send(userData);
         console.log(response,":RESPONSE")
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Passwords do not match');
    });

    it('should return 500 if username already exists', async () => {
        // Mock user already existing in the database
        jest.spyOn(userModel, 'findOne').mockResolvedValueOnce({ username: 'testuser' });

        const userData = {
            username: 'user1511', // Existing username
            firstname: 'John',
            lastname: 'Doe',
            emailid: 'test@example.com',
            password: 'Password@123',
            confirmpassword: 'Password@123',
            phonenumber: 1234567890
        };

        const response = await request(app)
            .post('/v1/user-signup')
            .send(userData);

        expect(response.status).toBe(500);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('UserName Already Exists!!');
    });

});
describe('POST /v1/user-login', () => {
    it('should return 200 and a success message on successful login', async () => {
        // Assuming you have a user in your database with username 'testuser' and password 'password123'
        const userData = {
            username: 'user1511',
            password: 'Password@123'
        };

        const response = await request(app)
            .post('/v1/user-login')
            .send(userData);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Login Successfull!!');
        expect(response.body.data.username).toBe(userData.username);
        expect(response.body.data.token).toBeDefined();
    });

    it('should return 500 if username is not found', async () => {
        const userData = {
            username: 'nonexistentuser',
            password: 'Password@123'
        };

        const response = await request(app)
            .post('/v1/user-login')
            .send(userData);

        expect(response.status).toBe(500);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('UserName Not Found!!');
    });

    it('should return 500 if password is incorrect', async () => {
        const userData = {
            username: 'user1511',
            password: 'Incorrectpassword@12'
        };

        const response = await request(app)
            .post('/v1/user-login')
            .send(userData);

        expect(response.status).toBe(500);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Password is Incorrect!!');
    });
});
describe('POST /v1/create-task', () => {
    it('should create a new task when provided with valid data', async () => {
        // Assuming user is authenticated and available in req.user
        const user = { username: 'user1511' };
        const taskData = {
            action: 'Do something',
            category: 'Work',
            description: 'Task description',
            priority: 'high',
            status: 'partially done',
            dueDate: '2024-03-25'
        };
       

        // Login to get the access token
        const loginResponse = await request(app)
            .post('/v1/user-login')
            .send({ username: 'user1511', password: 'Password@123' });
            console.log(loginResponse,":RESP")
           
            

        const accessToken = loginResponse.body.data.token;
        

        // Create task using the access token
        const response = await request(app)
            .post('/v1/create-task')
            .set('Authorization', `Bearer ${accessToken}`) // Use the correct variable
            .send(taskData)
            .set('user', JSON.stringify(user));

       

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Task created successfully');
        expect(response.body.data.username).toBe(user.username);
        expect(response.body.data.action).toBe(taskData.action);
    });
});

describe('GET /v1/fetch-task', () => {
    it('should fetch tasks with valid query parameters', async () => {
        const response = await request(app)
            .get('/v1/fetch-task')
            .query({
                username: 'testuser',
                action: 'Do something',
                priority: 'High',
                category: 'Work',
                status: 'Pending',
                page: 1,
                limit: 10
            });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Tasks retrieved successfully');
        expect(response.body.data.tasks).toBeDefined();
        expect(response.body.data.totalPages).toBeDefined();
        expect(response.body.data.currentPage).toBeDefined();
    });
});
describe('DELETE /v1/delete-task', () => {
    it('should delete a task with valid _id', async () => {
        // Assuming user is authenticated and available in req.user
        const user = { username: 'user1511' };

        // Create a task to get its ID
        const taskData = {
            action: 'Do something',
            category: 'Work',
            description: 'Task description',
            priority: 'high',
            status: 'partially done',
            dueDate: '2024-03-25'
        };

        // Login to get the access token
        const loginResponse = await request(app)
            .post('/v1/user-login')
            .send({ username: 'user1511', password: 'Password@123' });

        const accessToken = loginResponse.body.data.token;

        // Create task using the access token
        const createTaskResponse = await request(app)
            .post('/v1/create-task')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(taskData);

        const taskId = createTaskResponse.body.data._id;

        // Delete task using the access token and we can pass _id in taskId to check
        const deleteResponse = await request(app)
            .delete('/v1/delete-task')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ _id: taskId })
            .set('user', JSON.stringify(user)); // Simulate user in req.user

        expect(deleteResponse.status).toBe(200);
        expect(deleteResponse.body.success).toBe(true);
        expect(deleteResponse.body.message).toBe('Task Deleted Successfully');
        expect(deleteResponse.body.data).toBeDefined();
    });
});

describe('PUT /v1/update-task', () => {
    it('should update a task with valid _id and task data', async () => {
        // Assuming user is authenticated and available in req.user
        const user = { username: 'user1511' };
        // Assuming _id is the valid ID of an existing task
        const taskId = 'valid_task_id_here';
        const updatedTaskData = {
            action: 'Updated action',
            category: 'Updated category',
            description: 'Updated description',
            priority: 'Updated priority',
            status: 'Updated status',
            dueDate: '2024-03-31'
        };

        // Login to get the access token
        const loginResponse = await request(app)
            .post('/v1/user-login')
            .send({ username: 'user1511', password: 'Password@123' });
        const accessToken = loginResponse.body.data.token;

        // Update task using the access token and we can pass _id in taskId to check
        const response = await request(app)
            .put('/v1/update-task')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ _id: taskId, ...updatedTaskData })
            .set('user', JSON.stringify(user)); // Simulate user in req.user

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Task Updated Successfully');
        expect(response.body.data).toBeDefined();
    });
});
