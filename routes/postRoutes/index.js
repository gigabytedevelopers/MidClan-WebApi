const express = require('express');
const app = express.Router();

const PostController = require('../../controllers/posts/postController');
const Auth = require('../../middlewares/Authentication');

// endpoints
app.get('/all', Auth.checkToken, PostController.getAllPosts);
app.post('/create', Auth.checkToken, PostController.createNewPost);
app.post('/delete', Auth.checkToken, PostController.deletePost);
app.post('/edit', Auth.checkToken, PostController.editPost);
app.post('/comment/create', Auth.checkToken, PostController.commentOnPost);

module.exports = app;
