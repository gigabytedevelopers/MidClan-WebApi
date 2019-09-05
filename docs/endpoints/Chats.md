# Chats Endpoints 💬
====================================
>For the chats, there are two models: (Conversation and Message)
>
>### Conversation: 
> - Serves as a link between two users.
> - A list of conversations would return all the users you have initiated
> a chat with
> - conversation holds the ids of participants ( 2 users )
> 
>### Message:
> - Serves as actual message shared between two users
> - A list of chat would return all the conversation with a user



`BASE_URL: https://midclan-api.herokuapp.com/`
`API version: v1`
`Authorization: Bearer Token`

======================================

### Start New Conversation
> Use this URL for the first time a user tries sending a message

- Endpoint: `api/v1/chat/new/{recipientID}`
    - Action: `POST`
    - HEADERS: `{'Authorization': 'Bearer YOUR_TOKEN', 'Content-Type': 'application/json'}`
    - URL PARAM
      + `recipientID` - Add reciever's ID to URL
      + Example: `/api/v1/chat/new/5d6d6c46adfbd678d014c45e` 
    - BODY PARAMS:
```json
{
  "composedMessage": "Hello there, how are you?"
}
```
    - RESPONSE: 
```json
{
  "success": true,
  "payload": {
    "data": {
      "conversationId": "5d70331d887127b958a10edd",
      "message": {
        "_id": "5d70331d887127b958a10ede",
        "conversationId": "5d70331d887127b958a10edd",
        "body": "Hello there, how are you?",
        "author": "5d65d18477cdd1ce4d9d8b6a",
        "createdAt": "2019-09-04T21:56:45.633Z",
        "updatedAt": "2019-09-04T21:56:45.633Z",
        "__v": 0
      }
    }
  }
}
```

--------------------------------------------

### Reply to Conversation
> Use this URL for subsequent messages to a user

- Endpoint: `api/v1/chat/{conversationId}`
    - Action: `POST`
    - HEADERS: `{'Authorization': 'Bearer YOUR_TOKEN', 'Content-Type': 'application/json'}`
    - URL PARAM
      + `conversationId` - Add conversation ID to URL
      + Example: `/api/v1/chat/5d6d6c46adfbd678d014c45e` 
    - BODY PARAMS:
```json
{
  "composedMessage": "I'm fine thanks"
}
```
    - RESPONSE: 
```json
{
  "success": true,
  "payload": {
    "data": {
      "_id": "5d6f4216b40e9775b73e07c9",
      "conversationId": "5d6f404a96bba673d05d67d2",
      "body": "I'm fine thanks",
      "author": "5d65d18477cdd1ce4d9d8b6a",
      "createdAt": "2019-09-04T04:48:22.689Z",
      "updatedAt": "2019-09-04T04:48:22.689Z",
      "__v": 0
    }
  }
}
```

### Get All Conversations
> All users you have a chat with

- Endpoint: `/api/v1/chat/`
    - Action: `GET`
    - HEADERS: `{'Authorization': 'Bearer YOUR_TOKEN', 'Content-Type': 'application/json'}` 
    - RESPONSE:
```json
{
  "success": true,
  "payload": {
    "data": [
      {
        "_id": "",
        "firstname": "Sam",
        "lastname": "Adeyemi",
        "profilepicture": "localhost:3000/sammy@gmail.com/profile_pic/re.gif",
        "conversationId": "5d6f404a96bba673d05d67d2"
      },
      {
        "_id": "",
        "firstname": "Sam",
        "lastname": "Adeyemi",
        "profilepicture": "localhost:3000/sammy@gmail.com/profile_pic/re.gif",
        "conversationId": "5d70331d887127b958a10edd"
      },
      {
        "_id": "",
        "firstname": "Sammy",
        "lastname": "Jenny",
        "profilepicture": "localhost:3000/sammy@gmail.com/profile_pic/re.gif",
        "conversationId": "5d703ca6887127b958a10edf"
      }
    ]
  }
}
```

--------------------------------------------

### Get Single Conversation with User ( Get All message shared with user )
> View your conversation with a particular user
> returns an array of your chat with a user
> ordered with the latest message as first

- Endpoint: `/api/v1/chat/{conversationId}`
    - Action: `GET`
    - HEADERS: `{'Authorization': 'Bearer YOUR_TOKEN', 'Content-Type': 'application/json'}` 
    - URL PARAM
      + `conversationId` - Add conversation ID to URL
      + Example: `/api/v1/chat/5d6d6c46adfbd678d014c45e`
    - RESPONSE:
```json
{
  "success": true,
  "payload": {
    "data": [
      {
        "_id": "5d6f4216b40e9775b73e07c9",
        "body": "I'm fine thanks",
        "author": {
          "firstname": "Samuel",
          "lastname": "Ajayi",
          "_id": "5d65d18477cdd1ce4d9d8b6a"
        },
        "createdAt": "2019-09-04T04:48:22.689Z"
      },
      {
        "_id": "5d6f404b96bba673d05d67d3",
        "body": "Hello there, how are you?",
        "author": {
          "firstname": "Martins",
          "lastname": "Victor",
          "_id": "5d65d18477cdd1ce4d9d8b6a"
        },
        "createdAt": "2019-09-04T04:40:43.288Z"
      }
    ]
  }
}
```

----------------------------------------------


### Delete Conversation
> Removes the user and all messages shared with the user from your 
> conversation list.

- Endpoint: `/api/v1/chat/{conversationId}`
    - Action: `DELETE`
    - HEADERS: `{'Authorization': 'Bearer YOUR_TOKEN', 'Content-Type': 'application/json'}` 
    - URL PARAM
      + `conversationId` - Add conversation ID to URL
      + Example: `/api/v1/chat/5d6d6c46adfbd678d014c45e`
    - RESPONSE:
```json
{
  "success": true,
  "payload": {
    "data": "conversation deleted successfully"
  }
}
```

----------------------------------------------

