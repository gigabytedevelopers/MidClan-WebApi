const Respond = require('../../services/responses');
const PostModel = require('../../models/post');
const mongooseHandler = require('../../utilities/mongooseHandler');

class BookmarkController {
    /**
     * add post to bookmarks
     * @param {object} req [request object]
     * @param {object} res [request object]
     */
    static async addToBookmark (req, res) {
        const { user } = req;
        const { postId } = req.body;

        if (!postId) return Respond(res).error(
            400, 'missingParamsError', 'postId is required'
        );

        if ((typeof(postId) == 'string') && mongooseHandler.checkIsValidID(postId)) {
            const post = await PostModel.findOne({ _id: postId }).then(post => post);

            if (post) {
                // don't add if bookmark exists
                const bookmarkExists = user.bookmarks.find(post => post._id.equals(postId));

                if (bookmarkExists) return Respond(res).error(
                    400, 'badRequest', 'bookmark already exists'
                );
                post.meta.hasBookmarked.push(user._id.toString());
                user.bookmarks.push(post);
                user.save();
                return Respond(res).success({ data: user.bookmarks });
            }
            return Respond(res).error(404, 'resourceNotFound', 'Post not found');
        }
        return Respond(res).error(400, 'mongooseModelError', 'Invalid ID format');
    }
    /**
     * remove post from bookmarks
     * @param  {object} req [request object]
     * @param  {object} res [response object]
     * @return {json}
     */
    static async removeFromBookmark (req, res) {
        const { user } = req;
        const { postId } = req.body;

        if (!postId) return Respond(res).error(
            400, 'missingParamsError', 'postId is required'
        );

        if ((typeof(postId) == 'string') && mongooseHandler.checkIsValidID(postId)) {
            const bookmarkExists = user.bookmarks.find(post => post._id.equals(postId));
            if (bookmarkExists) {
                 // remove bookmark if exists
                const updatedBookmarks = user.bookmarks.filter(x => x !== bookmarkExists);
                user.bookmarks = updatedBookmarks;
                // save changes
                user.save();
                return Respond(res).success({ data: user.bookmarks });
            }
            return Respond(res).error(404, 'resourceNotFound', 'bookmark not found');
        }
        return Respond(res).error(400, 'mongooseModelError', 'Invalid ID format');
    }
    /**
     * get all user's bookmarks
     * @param  {object} req [request object]
     * @param  {object} res [response object]
     * @return {json}
     */
    static async getAllBookmarks (req, res) {
        const { user } = req;
        return Respond(res).success({ data: user.bookmarks });
    }
}

module.exports = BookmarkController;
