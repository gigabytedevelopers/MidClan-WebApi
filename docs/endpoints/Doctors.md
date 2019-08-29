# Doctors Endpoints 💉
======================================

`BASE_URL: https://midclan-api.herokuapp.com/`
`API version: v1`
`Authorization: Bearer Token`


======================================


### Get All Doctors

- Endpoint: `/api/v1/doctors/all`
    - Action: `GET`
    - HEADERS: `{'Authorization': 'Bearer YOUR_TOKEN', 'Content-Type': 'application/json'}`
    - RESPONSE: 
```json
{
  "success": true,
  "payload": {
    "data": [
      {
        "firstname": "Dele",
        "lastname": "Seun",
        "username": "seun",
        "email": "seun@gmail.com",
        "mobileno": 0,
        "dob": "",
        "state": "",
        "lga": "",
        "college": "",
        "university": "",
        "almamata": "",
        "referee": "",
        "biodata": "",
        "patientlist": "",
        "medicalcases": "",
        "gender": "",
        "bloodgroup": "",
        "genotype": "",
        "height": "",
        "weight": "",
        "bp": "",
        "password": "ad93bec95813bb337396461743ae629a2be8c3658959f61db21d512fb009dc5d563dfa36523afd2d85771bd3469196e3411f3bbbfaf88c479db3b588c6c8d4dd",
        "_id": "5d65f72181c607ea3fca6cbe",
        "created": "2019-08-28T03:38:09.206Z",
        "__v": 0
      },
      {
        "firstname": "Sammy",
        "lastname": "Seun",
        "username": "seun",
        "email": "sammy@gmail.com",
        "mobileno": 0,
        "dob": "",
        "state": "",
        "lga": "",
        "college": "",
        "university": "",
        "almamata": "",
        "referee": "",
        "biodata": "",
        "patientlist": "",
        "medicalcases": "",
        "gender": "",
        "bloodgroup": "",
        "genotype": "",
        "height": "",
        "weight": "",
        "bp": "",
        "password": "ad93bec95813bb337396461743ae629a2be8c3658959f61db21d512fb009dc5d563dfa36523afd2d85771bd3469196e3411f3bbbfaf88c479db3b588c6c8d4dd",
        "_id": "5d65f72181c607ea3fca6cbe",
        "created": "2019-08-28T03:38:09.206Z",
        "__v": 0
      }, 
    ]
  }
}
```


--------------------------------------------

### Get Single Doctor Details

- Endpoint: `/api/v1/doctors/profile/{id}`
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
      "firstname": "Dele",
      "lastname": "Seun",
      "username": "seun",
      "email": "seun@gmail.com",
      "mobileno": 0,
      "dob": "",
      "state": "",
      "lga": "",
      "college": "",
      "university": "",
      "almamata": "",
      "referee": "",
      "biodata": "",
      "patientlist": "",
      "medicalcases": "",
      "gender": "",
      "bloodgroup": "",
      "genotype": "",
      "height": "",
      "weight": "",
      "bp": "",
      "password": "ad93bec95813bb337396461743ae629a2be8c3658959f61db21d512fb009dc5d563dfa36523afd2d85771bd3469196e3411f3bbbfaf88c479db3b588c6c8d4dd",
      "_id": "5d65f72181c607ea3fca6cbe",
      "created": "2019-08-28T03:38:09.206Z",
      "__v": 0
    }
  }
}
```

