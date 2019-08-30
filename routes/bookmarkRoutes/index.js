const express = require('express');
const app = express.Router();

const BookmarkController = require('../../controllers/bookmark/BookmarkController');
const Auth = require('../../middlewares/Authentication');
// endpoints
app.get('/all', Auth.checkToken, BookmarkController.getAllBookmarks);
app.post('/add', Auth.checkToken, BookmarkController.addToBookmark);
app.delete('/remove', Auth.checkToken, BookmarkController.removeFromBookmark);

module.exports = app;
