# 🔑 Auth-API 🔑
An API made with typescript responsible for authenticating the user

## 📍 How to run this project

```
# will build and run the containers

~ docker-compose up --build
```

## POST/user/login

This EndPoint is responsible for user authentication.

### Parameters:

- Email: Email from the registered user of the system

- password: Password of the registered user of the system

```
{
    "password": "example123456",
    "email": "example@example.com"
}   
```

### Response:

### Ok! 200

If this response is successful you will receive token
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haJwiOiJAbHVjYXMuY29tIiwiaWF0IjoxNjEyMTEwNTg2LCJleHAiOjE2MTIyODMzODZ9.8exL7fMcmShBrthpK15sc9mnU6pVoFOWTvbN6fmTZJg"
}
```

## POST/user/create

This EndPoint is responsible for registering a new user!

### Parameters

- name: user name

- password: user password

- email: user email

### Responses:

### Ok! 201

a success message is returned if the response is successful
```
{success: "the user has been successfully registered!"}
```
## 💡 This project uses:

- Typescript
- Express
- Docker
- JWT
- MongoDB
