# Bookmark Endpoints 📝
====================================

`BASE_URL: https://midclan-api.herokuapp.com/`
`API version: v1`
`Authorization: Bearer Token`

======================================


### Get All Bookmarks 
> Posts bookmarked by user
> Response: Array of all bookmarks

- Endpoint: `/api/v1/bookmark/all`
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
          "name": "Sam James",
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
          "dsfdsfkljlkjkljkljd",
          "skfldskfjsldkf",
          "sdlfkjsldkjf"
        ],
        "_id": "5d68591ed7eecfa017d338c9",
        "body": "Okay have a great one",
        "comments": [],
        "__v": 0
      }
    ]
  }
}
```

--------------------------------------------

### Remove Bookmark
> Remove a post from bookmark list
> Response: array of bookmarks after removal

- Endpoint: `/api/v1/bookmark/remove`
    - Action: `DELETE`
    - HEADERS: `{'Authorization': 'Bearer YOUR_TOKEN', 'Content-Type': 'application/json'}` 
    - PARAMS:
```json
{
  "postId": "5d674f3f2f893a7cd53836eb" // postid to be removed from bookmark
}
```
    - RESPONSE:
```json
{
  "success": true,
  "payload": {
    "data": [] // current bookmark list
  }
}
```

--------------------------------------------

### Add Post to Bookmark
> bookmark a post / add a post to bookmark
> Response: array of bookmarks after adding.

- Endpoint: `/api/v1/posts/comments/create`
    - Action: `POST`
    - HEADERS: `{'Authorization': 'Bearer YOUR_TOKEN', 'Content-Type': 'application/json'}` 
    - PARAMS:
```json
{
  "postId": "5d68591ed7eecfa017d338c9"
}
```
    - RESPONSE:
```json
{
  "success": true,
  "payload": {
    "data": [
      {
        "author": {
          "name": "Sam James",
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
          "dsfdsfkljlkjkljkljd",
          "skfldskfjsldkf",
          "sdlfkjsldkjf"
        ],
        "_id": "5d68591ed7eecfa017d338c9",
        "body": "Okay have a great one",
        "comments": [],
        "__v": 0
      }
    ]
  }
}
```

