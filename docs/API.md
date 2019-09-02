# <center> MidClan Authentication Server Documentation </center>

![welcome gif](https://media.giphy.com/media/xUPGGDNsLvqsBOhuU0/giphy.gif)

## Introduction

Welcome to the MidClan Authentication Server API. With the server, users can create an account and login to their respective accounts. The API is very easy to interface with, and contanis coding examples and illustrations that clearly explains how to consume the API.

## Contents
- Responses
    * Errors
        * status
        * success
        * error 
            - code
            - type 
            - message
            - err
    * Succeess
        * status
        * success
        * payload
- Routes
    - signup
        * user
        * doctor
        * pharmacists
        * lab technician
    - login
        * user
        * doctor
        * pharmacists
        * lab technician

### Responses
The responses from the API will always be in two forms, namely;
* The Error Response 
* The Success  Response

#### Error Responses
The error responses occurs when something goes wrong on the either on the server or from the users end.

A typical error response from the MidClan Auth Server should look as shown below

```javascript
{
    success: false,
    error: {
        code: 403,
        type: 'accountAuthenticationError'
        message: 'A wrong email/username - password combination was provided.'
        err: {}
     }
}
```

Now let's try to go through each part of the error object
######  Success 
- This always responds with a `false` Object. 
- The success property should always be the first thing that is checked for from the server's responses to be sure if everything is fine. 
- If it responds with `true`, then you can proceed to consume the payload. 
- If it is a `false` success object, the errors should be displayed accordingly.

###### Error
- The error property gives additional information about the error
    - <b>code</b> - The error code
    - <b>type</b> - The type of the error that happened, there are two types currently, namely;
        - accountAuthenticationError
        - accountCreationError (Can respond with several messages depending on the error)
    - <b>The message</b> - A message that tells the user more about the error that occured (Can be displayed to the user)
    - <b>err</b> - The server generated error object (For developers only during development)
    
#### Success Responses
The success responses on the contrary occurs when everything is okay on both the server and the users end.
A typical success response from the MidClan Auth Server should look as shown below

```javascript
{
  "success": true,
  "payload": {
    "data": {
      "firstname": "Sammy",
      "lastname": "Jenny",
      "username": "sammy",
      "email": "sammy@gmail.com",
      "mobileno": 0,
      "profilepicture": "localhost:3000/sammy@gmail.com/profile_pic/profilepicture.gif",
      "dob": "",
      "gender": "",
      "bloodgroup": "",
      "genotype": "",
      "height": "",
      "weight": "",
      "bp": "",
      "bookmarks": [],
      "_id": "5d6d7848a2988401361f0353",
      "created": "2019-09-02T20:15:04.273Z",
      "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdG5hbWUiOiJTYW1teSIsInVzZXJuYW1lIjoic2FtbXkiLCJlbWFpbCI6InNhbW15QGdtYWlsLmNvbSIsImlhdCI6MTU2NzQ1NTMwNCwiZXhwIjoxNTcwMDQ3MzA0fQ.F9uuSDzduXNQRIqdHm_cgKV5-Gpt6yViaPxZeB9xsc0"
  }
}
```

Now let's try to go through each part of the error object
######  Success 
- This always responds with a `true` Object. 

###### Payload
- This contains the necessary data associated with the user
    - <b>data</b> - This contains the users personal data
    - <b>token</b> - This is the servers authentication token for that user to be stored on the front end
    
### Routes
All requests made to the server should always be in the format 
```javascript
<base-url>/api/v1/auth/<route>
```

The base-url for the Auth Server is `https://midclan-webapi.herokuapp.com`

#### Signup 
To signup, a `POST` request with a body that has the following fields must be sent to the server

```javascript
{
  firstname : "Femi", // required
  lastname : "Funso", // required
  username : "FemiFunso4", // required
  email : "femi4@gmail.com", // required
  mobileno : "08133282428", // optional
  address : "2, okegbenro street", // optional
  state : "Lagos",  // optional
  country : "Nigeria", // optional
  dob: "16, Aug", // optional
  gender : "Male", // optional
  profilepicture: {
    "str": "R0lGODlhPQBEAPeoAJosM//AwO/AwHVYZ/z595kzAP/s7P+goOXMv8+fhw/v739/f+8PD98fH/8mJl+fn/9ZWb8/PzWlwv///6wWGbImAPgTEMImI..", // base64Str
    "image_ext": "png",
    "filename": "profilepicture"
  }, //optional
  password : "FemiFunso" #required
}
```

on successful account creation, a response is gotten from the server as such;

```javascript
{
  "success": true,
  "payload": {
    "data": {
      "firstname": "Sammy",
      "lastname": "Jenny",
      "username": "sammy",
      "email": "sammy@gmail.com",
      "mobileno": 0,
      "profilepicture": "localhost:3000/sammy@gmail.com/profile_pic/profilepicture.gif",
      "dob": "",
      "gender": "",
      "bloodgroup": "",
      "genotype": "",
      "height": "",
      "weight": "",
      "bp": "",
      "bookmarks": [],
      "_id": "5d6d7848a2988401361f0353",
      "created": "2019-09-02T20:15:04.273Z",
      "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdG5hbWUiOiJTYW1teSIsInVzZXJuYW1lIjoic2FtbXkiLCJlbWFpbCI6InNhbW15QGdtYWlsLmNvbSIsImlhdCI6MTU2NzQ1NTMwNCwiZXhwIjoxNTcwMDQ3MzA0fQ.F9uuSDzduXNQRIqdHm_cgKV5-Gpt6yViaPxZeB9xsc0"
  }
}
```

#### login
To login, a `POST` request with a body that has the following fields must be sent to the server
```javascript
{
  "email" : "femi4@gmail.com",
  "password" : "FemiFunso"
}
```

A response similar to that gotten for the signup is returned from the server.

The Signing up process for both users, patients, doctors and lab technicians is the same, same request and data format, since the needed registration data is the same for every user. Although the endpoint for signing up or logging in for each user varies.

The endpoints are as shown below 
- Users
    - login
        * `https://midclan-api.herokuapp.com/api/v1/auth/login/user`
        * `https://midclan-api.herokuapp.com/api/v1/auth/login/doctor`
        * `https://midclan-api.herokuapp.com/api/v1/auth/login/pharmacist`
        * `https://midclan-api.herokuapp.com/api/v1/auth/login/labtech`
    - signup
        * `https://midclan-api.herokuapp.com/api/v1/auth/signup/user`
        * `https://midclan-api.herokuapp.com/api/v1/auth/signup/doctor`
        * `https://midclan-api.herokuapp.com/api/v1/auth/signup/pharmacist`
        * `https://midclan-api.herokuapp.com/api/v1/auth/signup/labtech`


# Congratulations, you can now proceed to using the MidClan Auth Server 

![celebration](https://media.giphy.com/media/3o7abIileRivlGr8Nq/giphy.gif)



                                                        ...
