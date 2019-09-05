# Post Endpoints 📝
====================================

`BASE_URL: https://midclan-api.herokuapp.com/`
`API version: v1`
`Authorization: Bearer Token`

======================================

### Get All Posts

- Endpoint: `/api/v1/posts/all`
    - Action: `GET`
    - HEADERS: `{'Authorization': 'Bearer YOUR_TOKEN', 'Content-Type': 'application/json'}`
    - RESPONSE: 
```json
{
  "success": true,
  "payload": {
    "data": [
      {
        "author": {
          "name": "Daniel Samson",
          "imageUrl": "https://image.freepik.com/free-photo/blue-orange-cactus-vase-isolated_6607-236.jpg",
          "_id": "5d65d18477cdd1ce4d9d8b6a"
        },
        "meta": {
          "commentsCount": 0,
          "likesCount": 0
        },
        "title": "One Post",
        "status": "active",
        "postImages": [
          "dsfdsfkljlkjkljkljd",
          "skfldskfjsldkf",
          "sdlfkjsldkjf"
        ],
        "_id": "5d674f3f2f893a7cd53836eb",
        "body": "this is a random post about this and that, here and there",
        "comments": [],
        "__v": 0
      },
      {
        "author": {
          "name": "Daniel Samson",
          "imageUrl": "https://image.freepik.com/free-photo/blue-orange-cactus-vase-isolated_6607-236.jpg",
          "_id": "5d65d18477cdd1ce4d9d8b6a"
        },
        "meta": {
          "commentsCount": 0,
          "likesCount": 0
        },
        "title": "Another random post",
        "status": "active",
        "postImages": [
          "dsfdsfkljlkjkljkljd",
          "skfldskfjsldkf",
          "sdlfkjsldkjf"
        ],
        "_id": "5d674f3f2f893a7cd53836eb",
        "body": "this is a random post about this and that, here and there",
        "comments": [],
        "__v": 0
      },
    ]
  }
}
```

--------------------------------------------

### Create New Post

- Endpoint: `/api/v1/posts/create`
    - Action: `POST`
    - HEADERS: `{'Authorization': 'Bearer YOUR_TOKEN', 'Content-Type': 'application/json'}` 
    - PARAMS:
```json
{
    "title": "Hello world",
    "body": "this is a random post about this and that, here and there",
    "postImages": [
      {
        "str": "R0lGODlhPQBEAPeoAJosM//AwO/AwHVYZ/z595kzAP/s7P+goOXMv8+fhw/v739/f+8PD98fH/8mJl+fn/9ZWb8/PzWlwv///6wWGbI...", // base64 image string
        "image_ext": "png",
        "filename": "newfile"
      },
      {
        "str": "R0lGODlhPQBEAPeoAJosM//AwO/AwHVYZ/z595kzAP/s7P+goOXMv8+fhw/v739/f+8PD98fH/8mJl+fn/9ZWb8/PzWlwv///6wWGbI...", // base64 image string
        "image_ext": "png",
        "filename": "newfile"
      }
    ]
}
```
    - RESPONSE:
```json
{
  "success": true,
  "payload": {
    "data": {
      "author": {
        "name": "Martins Victor",
        "imageUrl": "https://image.freepik.com/free-photo/blue-orange-cactus-vase-isolated_6607-236.jpg",
        "_id": "5d65d18477cdd1ce4d9d8b6a"
      },
      "meta": {
        "commentsCount": 0,
        "likesCount": 0
      },
      "title": "Something awesome happened today",
      "status": "active",
      "postImages": [
        "{HOST}/krat@gmail.com/posts/5d6cc60a3e0214402d3dfa9d/fireman.jpg",
        "{HOST}/krat@gmail.com/posts/5d6cc60a3e0214402d3dfa9d/smallimage.gif"
      ],
      "_id": "5d6cc60a3e0214402d3dfa9d",
      "body": "Here's a bit of detail about it",
      "comments": [],
      "created": "2019-09-02T07:34:34.343Z"
    }
  }
}
```

--------------------------------------------

### Comment on Post

- Endpoint: `/api/v1/posts/comment/create`
    - Action: `POST`
    - HEADERS: `{'Authorization': 'Bearer YOUR_TOKEN', 'Content-Type': 'application/json'}` 
    - PARAMS:
```json
{
    "postId": "5d6752c5ea629f83220688c9",
    "comment": "you should do this more."
}
```
    - RESPONSE:
```json
{
  "success": true,
  "payload": {
    "data": {
      "author": {
        "name": "Jame Pascal",
        "imageUrl": "https://image.freepik.com/free-photo/blue-orange-cactus-vase-isolated_6607-236.jpg",
        "_id": "5d65d18477cdd1ce4d9d8b6a"
      },
      "body": "you should do this more.",
      "_id": "5d6764a2402532101aebc869",
      "created": "2019-08-29T05:37:38.725Z"
    }
  }
}
```

----------------------------------------------

### Delete Post

- Endpoint: `/api/v1/posts/delete`
    - Action: `DELETE`
    - HEADERS: `{'Authorization': 'Bearer YOUR_TOKEN', 'Content-Type': 'application/json'}` 
    - PARAMS:
```json
{
    "postId": "5d6752c5ea629f83220688c9"
}
```
    - RESPONSE:
```json
{
  "success": true,
  "payload": {
    "data": "post deleted successfully"
  }
}
```

----------------------------------------------

### Edit Post

- Endpoint: `/api/v1/posts/edit`
    - Action: `POST`
    - HEADERS: `{'Authorization': 'Bearer YOUR_TOKEN', 'Content-Type': 'application/json'}` 
    - PARAMS:
```json
{
    "postId": "5d6752c5ea629f83220688c9",
    "title": "THIS UPDATE IS GREAT",
    "body": "this too",
}
```
    - RESPONSE:
```json
{
  "success": true,
  "payload": {
    "data": {
      "author": {
        "name": "Samuel Peters",
        "imageUrl": "https://image.freepik.com/free-photo/blue-orange-cactus-vase-isolated_6607-236.jpg",
        "_id": "5d65d18477cdd1ce4d9d8b6a"
      },
      "meta": {
        "commentsCount": 0,
        "likesCount": 0,
        "hasBookmarked": [
          "5d65d18477cdd1ce4d9d8b6a", // id of users who bookmarked. (for timeline)
        ]
      },
      "title": "THIS UPDATE IS GREAT",
      "status": "active",
      "postImages": [
        "dsfdsfkljlkjkljkljd",
        "skfldskfjsldkf",
        "sdlfkjsldkjf"
      ],
      "_id": "5d674f3f2f893a7cd53836eb",
      "body": "this too",
      "comments": [],
      "__v": 0
    }
  }
}
```

