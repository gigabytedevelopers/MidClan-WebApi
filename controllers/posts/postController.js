const Respond = require('../../services/responses');
const PostModel = require('../../models/post');
const mongooseHandler = require('../../utilities/mongooseHandler');
const Base64Handler = require('../../utilities/base64Handler');

class PostController {
    /**
     * get all posts
     * @param  {object} req [request object]
     * @param  {object} res [response object]
     * @return {json}
     */
    static async getAllPosts (req, res) {
        const posts = await PostModel.find().then(posts => posts);
        return Respond(res).success({ data: posts });
    }
    /**
     * Create new post
     * @param  {object} req [request object]
     * @param  {object} res [response object]
     * @return {json}
     */
    static async createNewPost (req, res) {
        const { title, body, postImages } = req.body;
        const { user } = req;
        const { host } = req.headers;

        if (!title || !body || !postImages) return Respond(res).error(
            400, 'missingParamsError', 'title and body is required, postImages (optional)'
        );
        if (!Array.isArray(postImages)) return Respond(res).error(400, 'invalidImages', 'postImages must be an array');
        const post = new PostModel({ title, body });
        try {
            post.postImages = await Promise.all(postImages.map(async img => {
                const filepath = await Base64Handler.toImage({
                    str: img.str, ext: img.image_ext, filename: img.filename,
                    path: `public/${encodeURIComponent(user.email)}/posts/${post._id}/`
                });
                return `${host}/${filepath.substring(7)}`;
            }));
            post.author = { name: `${user.firstname} ${user.lastname}`, imageUrl: user.profilepicture, _id: user._id };
            await post.save();
            return Respond(res).success({ data: post });
        } catch (error) {
            return Respond(res).error(400, 'invalidImages', 'The post images could not be saved');
        }
    }
    /**
     * Comment on a post
     * @param  {object} req [request object]
     * @param  {object} res [request object]
     * @return {json}
     */
    static async commentOnPost (req, res) {
        const { postId, comment } = req.body;
        const { user } = req;

        if (mongooseHandler.checkIsValidID(postId)) {
            if (!postId || !comment) return Respond(res).error(
                400, 'missingParamsError', 'postId and comment is required'
            );
            const post = await PostModel.findOne({ _id: postId }).then(post => post);

            if (!post) Respond(res).error(
                404, 'resourceNotFound', 'post not found'
            );
            // create new comment
            const newComment = {
                body: comment,
                author: {
                    name: `${user.firstname} ${user.lastname}`,
                    imageUrl: user.profilepicture,
                    _id: user._id
                }
            };

            post.comments.push(newComment); // add to existing comments
            post.meta.commentsCount = post.comments.length; // increment count
            await post.save();
            const savedComment = post.comments[post.comments.length - 1];

            return Respond(res).success({ data: savedComment });
        }
        return Respond(res).error(400, 'mongooseModelError', 'Invalid ID format');
    }
    /**
     * Delete post
     * @param  {object} req [request object]
     * @param  {object} res [response object]
     * @return {json}
     */
    static async deletePost (req, res) {
        const { postId } = req.body;
        const { user } = req;

        if (!postId) return Respond(res).error(
            401, `missingParamsError`, 'postId is required'
        );

        if (mongooseHandler.checkIsValidID(postId)) {
            const post = await PostModel.findOne({ _id: postId }).then(post => post);
            if (!post) {
                return Respond(res).error(
                    404, 'resourceNotFound', 'post not found'
                );
            }

            if (post.author._id.equals(user._id)) {
                // delete post
                await post.remove();
                return Respond(res).success({ data: 'post deleted successfully'}, []);
            }
            Respond(res).error(401, 'authorizationError', 'you cannot delete this post');
        }
        return Respond(res).error(400, 'mongooseModelError', 'Invalid ID format');
    }
    /**
     * Edit post
     * @param  {object} req [request object]
     * @param  {object} res [response object]
     * @return {json}
     */
    static async editPost (req, res) {
        const { title, body, postId } = req.body;

        if (!title || !body || !postId) {
            return Respond(res).error(
                400, 'missingParamsError', 'title, body and postId are required'
            );
        }

        if (mongooseHandler.checkIsValidID(postId)) {
            /**
             * we're not using updateOne or update
             * this is because they do not return the model instance
             * we need the updated model instance to be returned
             * TODO: we need to find the most efficient way to replace images
             */
            const post = await PostModel.findOne({ _id: postId }).then(post => {
                post.title = title
                post.body = body
                post.save();

                return post;
            });
            return Respond(res).success({ data: post });
        }
        return Respond(res).error(400, 'mongooseModelError', 'Invalid ID format');
    }
    /**
     * Share post
     * @param  {object} req [request object]
     * @param  {object} res [response object]
     * @return {json}
     */
    static async sharePost (req, res) {
        const { user } = req;
        const { postId } = req.body;
        const { shareComment } = req.body;

        if (mongooseHandler.checkIsValidID(postId)) {
            const postToShare = await PostModel.findOne({ _id: postId }).then(post => post);
            // const sharePost = new PostModel({

            // });
        }
    }
}

module.exports = PostController;
