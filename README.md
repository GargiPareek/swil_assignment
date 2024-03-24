# Swil Assignment

Assignment based on CRUD operations

## Installation

## Usage

## API Endpoints
USER
POST : localhost:3000/v1/user-signup
REQUEST : {
    "username":"Gargi@1511",
    "firstname":"Gargi",
    "lastname":"Pareek",
    "emailid":"gargi@gmail.com",
    "password":"Abcd@1234",
    "confirmpassword":"Abcd@1234",
    "phonenumber":9876543212
}
RESPONSE : {
    "success": true,
    "message": "User registered successfully",
    "data": {
        "username": "Gargi@1511",
        "firstname": "Gargi",
        "lastname": "Pareek",
        "emailid": "gargi@gmail.com",
        "password": "$2b$10$z995z2bBU7Dv6Lmwo6VZbOjqWgfVjxB4VAt5bQmuGeJT7Qqhm6zs2",
        "phonenumber": "9876543212",
        "_id": "65fecd69c6c059361ac5335c",
        "__v": 0
    }
}

POST : localhost:3000/v1/user-login
REQUEST : {
    "username":"Gargi@1511",
    "password":"Abcd@1234"
}
RESPONSE : {
    "success": true,
    "message": "Login Successfull!!",
    "data": {
        "username": "Gargi@1511",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6IjY1ZmVjZDY5YzZjMDU5MzYxYWM1MzM1YyIsInVzZXJuYW1lIjoiR2FyZ2lAMTUxMSIsImVtYWlsaWQiOiJnYXJnaUBnbWFpbC5jb20ifSwiaWF0IjoxNzExMTk3NjAxLCJleHAiOjE3MTEyMDEyMDF9.3qzI-lMbRuVLhdRAWaBF3ucn0nGG5HJ4SwlrkOKIE-4"
    }
}

TASK 
POST : localhost:3000/v1/create-task
REQUEST : {
    "action":"Purchase",
    "category":"purchase order",
    "description":"Buying a product",
    "priority":"high",
    "status":"in progress",
    "dueDate":"9-09-2023"
}
RESPONSE:{
    "success": true,
    "message": "Task created successfully",
    "data": {
        "username": "Gargi@1511",
        "action": "Purchase",
        "category": "purchase order",
        "description": "Buying a product",
        "priority": "high",
        "status": "in progress",
        "dueDate": "2023-09-08T18:30:00.000Z",
        "_id": "65fecf22c6c059361ac53363",
        "__v": 0
    }
}


GET :localhost:3000/v1/fetch-task?username=Gargi@1511

RESPONSE : {
    "success": true,
    "message": "Tasks retrieved successfully",
    "data": {
        "tasks": [
            {
                "_id": "65fecf22c6c059361ac53363",
                "username": "Gargi@1511",
                "action": "Purchase",
                "category": "purchase order",
                "description": "Buying a product",
                "priority": "high",
                "status": "in progress",
                "dueDate": "2023-09-08T18:30:00.000Z",
                "__v": 0
            }
        ],
        "totalPages": 1,
        "currentPage": 1
    }
}

PUT : localhost:3000/v1/update-task
REQUEST : {
    "_id":"65fec3b4ff6c07d9df5bd928",
    "action":"Sell"
}

RESPONSE : {
    "success": true,
    "message": "Task Updated Successfully",
    "data": {
        "acknowledged": true,
        "modifiedCount": 0,
        "upsertedId": "65fec3b4ff6c07d9df5bd928",
        "upsertedCount": 1,
        "matchedCount": 0
    }
}

DELETE : localhost:3000/v1/delete-task
REQUEST : { "_id":"65fecf22c6c059361ac53363"}
RESPONSE : {
    "success": true,
    "messgae": "Task Deleted Successfully",
    "data": {
        "acknowledged": true,
        "deletedCount": 1
    }
}


## License



