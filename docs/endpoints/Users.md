# User Endpoints
======================================

`BASE_URL: https://midclan-api.herokuapp.com/`
`API version: v1`
`Authorization: Bearer Token`


======================================


### Get All Users

- Endpoint: `/api/v1/users/all`
    - Action: `GET`
    - HEADERS: `{'Authorization': 'Bearer YOUR_TOKEN', 'Content-Type': 'application/json'}`
    - RESPONSE: 
```json
{
  "success": true,
  "payload": {
    "data": [
      {
        "firstname": "Somto",
        "lastname": "Daniel",
        "username": "Kran",
        "email": "kran@gmail.com",
        "mobileno": 0,
        "dob": "",
        "gender": "",
        "bloodgroup": "",
        "genotype": "",
        "height": "",
        "weight": "",
        "bp": "",
        "password": "3ac715db52bf2dc61de9d1f71e6e80374058accec861975717b3c6e511d9776bebd3e10590ee1481cae116cf2ccf2b0496a6d17993ee02088bb7c47d88a206b8",
        "_id": "5d65d18477cdd1ce4d9d8b6a",
        "created": "2019-08-28T00:57:40.890Z",
        "__v": 0
      },
      {
        "firstname": "Sammy",
        "lastname": "Grace",
        "username": "Gracy",
        "email": "grace@gmail.com",
        "mobileno": 0,
        "dob": "",
        "gender": "",
        "bloodgroup": "",
        "genotype": "",
        "height": "",
        "weight": "",
        "bp": "",
        "password": "30cb598c25aa9a45cc25e8572d806191969911fa053e394bf8fa4a821b1d8cf82328a005597e757a3f0d9af02e0555bd2ea8c783b854d3e6d5e692bdc1c3e69c",
        "_id": "5d65d1ae77cdd1ce4d9d8b6b",
        "created": "2019-08-28T00:58:22.647Z",
        "__v": 0
      }
    ]
  }
}
```


--------------------------------------------

### Get Single User Details

- Endpoint: `/api/v1/users/profile/{id}`
    - Action: `GET`
    - HEADERS: `{'Authorization': 'Bearer YOUR_TOKEN', 'Content-Type': 'application/json'}` 
    - PARAMS:
```json
{
    id: "5d65d1ae77cdd1ce4d9d8b6b" // value of the _id key
}

```
    - RESPONSE:
```json
{
  "success": true,
  "payload": {
    "data": {
      "firstname": "Grace",
      "lastname": "Janeth",
      "username": "Gracy",
      "email": "grace@gmail.com",
      "mobileno": 0,
      "dob": "",
      "gender": "",
      "bloodgroup": "",
      "genotype": "",
      "height": "",
      "weight": "",
      "bp": "",
      "password": "30cb598c25aa9a45cc25e8572d806191969911fa053e394bf8fa4a821b1d8cf82328a005597e757a3f0d9af02e0555bd2ea8c783b854d3e6d5e692bdc1c3e69c",
      "_id": "5d65d1ae77cdd1ce4d9d8b6b",
      "created": "2019-08-28T00:58:22.647Z",
      "__v": 0
    }
  }
}
```

--------------------------------------------

### Get Active User Profile

- Endpoint: `/api/v1/users/profile/`
    - Action: `GET`
    - HEADERS: `{'Authorization': 'Bearer YOUR_TOKEN', 'Content-Type': 'application/json'}` 
    - RESPONSE:
```json
{
  "success": true,
  "payload": {
    "data": {
      "firstname": "Samuel",
      "lastname": "Peter",
      "username": "Kratin",
      "email": "krat@gmail.com",
      "mobileno": 0,
      "dob": "",
      "gender": "",
      "bloodgroup": "",
      "genotype": "",
      "height": "",
      "weight": "",
      "bp": "",
      "password": "3ac715db52bf2dc61de9d1f71e6e80374058accec861975717b3c6e511d9776bebd3e10590ee1481cae116cf2ccf2b0496a6d17993ee02088bb7c47d88a206b8",
      "_id": "5d65d18477cdd1ce4d9d8b6a",
      "created": "2019-08-28T00:57:40.890Z",
      "__v": 0
    }
  }
}
```

