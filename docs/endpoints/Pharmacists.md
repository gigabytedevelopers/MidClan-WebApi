# Pharmacist Endpoints 💊
======================================

`BASE_URL: https://midclan-api.herokuapp.com/`
`API version: v1`
`Authorization: Bearer Token`


======================================


### Get All Pharmacists

- Endpoint: `/api/v1/pharmacists/all`
    - Action: `GET`
    - HEADERS: `{'Authorization': 'Bearer YOUR_TOKEN', 'Content-Type': 'application/json'}`
    - RESPONSE: 
```json
{
  "success": true,
  "payload": {
    "data": [
      {
        "firstname": "Samuel",
        "lastname": "Muoto",
        "username": "Sammy",
        "email": "Sam@gmail.com",
        "mobileno": 0,
        "dob": "",
        "state": "",
        "lga": "",
        "college": "",
        "university": "",
        "almamata": "",
        "referee": "",
        "biodata": "",
        "patientlist": [
          ""
        ],
        "medicalcases": [
          ""
        ],
        "prescriptioncases": [
          ""
        ],
        "gender": "",
        "bloodgroup": "",
        "genotype": "",
        "height": "",
        "weight": "",
        "bp": "",
        "password": "626e75ce2f9107a6fc55aa13c0943a91ac2ed6a08963a9a00c6affc21240424f71242a2d9bd4a8a29f7abec5c0a10bf759b5f2df2dc8744e6f3d86f716ac238b",
        "_id": "5d65e899503985e14cb5fb09",
        "created": "2019-08-28T02:36:09.965Z",
        "__v": 0
      },
      {
        "firstname": "Samuel",
        "lastname": "Muoto",
        "username": "Sammy",
        "email": "Sam@gmail.com",
        "mobileno": 0,
        "dob": "",
        "state": "",
        "lga": "",
        "college": "",
        "university": "",
        "almamata": "",
        "referee": "",
        "biodata": "",
        "patientlist": [
          ""
        ],
        "medicalcases": [
          ""
        ],
        "prescriptioncases": [
          ""
        ],
        "gender": "",
        "bloodgroup": "",
        "genotype": "",
        "height": "",
        "weight": "",
        "bp": "",
        "password": "626e75ce2f9107a6fc55aa13c0943a91ac2ed6a08963a9a00c6affc21240424f71242a2d9bd4a8a29f7abec5c0a10bf759b5f2df2dc8744e6f3d86f716ac238b",
        "_id": "5d65e899503985e14cb5fb09",
        "created": "2019-08-28T02:36:09.965Z",
        "__v": 0
      }
    ]
  }
}
```


--------------------------------------------

### Get Single Pharmacist Details

- Endpoint: `/api/v1/pharmacists/profile/{id}`
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
      "firstname": "Samuel",
      "lastname": "Muoto",
      "username": "Sammy",
      "email": "Sam@gmail.com",
      "mobileno": 0,
      "dob": "",
      "state": "",
      "lga": "",
      "college": "",
      "university": "",
      "almamata": "",
      "referee": "",
      "biodata": "",
      "patientlist": [
        ""
      ],
      "medicalcases": [
        ""
      ],
      "prescriptioncases": [
        ""
      ],
      "gender": "",
      "bloodgroup": "",
      "genotype": "",
      "height": "",
      "weight": "",
      "bp": "",
      "password": "626e75ce2f9107a6fc55aa13c0943a91ac2ed6a08963a9a00c6affc21240424f71242a2d9bd4a8a29f7abec5c0a10bf759b5f2df2dc8744e6f3d86f716ac238b",
      "_id": "5d65e899503985e14cb5fb09",
      "created": "2019-08-28T02:36:09.965Z",
      "__v": 0
    }
  }
}
```

