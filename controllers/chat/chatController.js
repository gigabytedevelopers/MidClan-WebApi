const Conversation = require('../../models/conversation');
const Message = require('../../models/message');
const User = require('../../models/users');
const Respond = require('../../services/responses');

class ChatController {
    static getConversations (req, res, next) {
        const { _id } = req.user;
        // find conversations where auth user is a participant
        Conversation.find({ participants: _id })
            .sort('-createdAt')
            // .select('_id')
            .select('participants')
            .exec((error, conversations) => {
                if (error) {
                    return Respond(res).error(404, 'conversationRetrievalError', `conversation could not be retrieved: ${error}`)
                }
                const allConversations = []
                conversations.forEach((conversation) => {
                    let recipientId = conversation.participants[1];
                    User.findOne({ _id: recipientId })
                        .select('firstname lastname profilepicture _id')
                        .exec((error, user) => {
                            // user.conversationId = conversation._id;
                            let userObj = {
                                _id: '',
                                firstname: '',
                                lastname: '',
                                profilepicture: '',
                                conversationId: ''
                            };
                            userObj.firstname = user.firstname;
                            userObj.lastname = user.lastname;
                            userObj.profilepicture = user.profilepicture
                            userObj.conversationId = conversation._id

                            console.log('before push', userObj);
                            allConversations.push(userObj)

                            if (conversations.length == allConversations.length) {
                                return Respond(res).success({ data: allConversations })
                            }
                        })
                })
            });
        // Conversation.find({ participants: _id })
        //     .select('_id')
        //     .exec((error, conversations) => {
        //         if (error) {
        //             return Respond(res).error(404, 'conversationRetrievalError', `conversation could not be retrieved: ${error}`)
        //         }
        //         // Set up empty array to hold conversations + most recent message
        //         let fullConversations = [];
        //         conversations.forEach((conversation) => {
        //             Message.find({ conversationId: conversation._id })
        //                 .sort('-createdAt')
        //                 .limit(1)
        //                 .populate({
        //                     path: "author",
        //                     select: "firstname lastname"
        //                 })
        //                 .exec((err, message) => {
        //                     if (err) {
        //                         return Respond(res).error(500, 'messageRetrievalError', `messages could not be retrieved: ${err}`);
        //                     }
        //                     fullConversations.push(message);
        //                     if (fullConversations.length == conversations.length) {
        //                         return Respond(res).success({ data: fullConversations })
        //                     }
        //                 })
        //         })
        //     })
    }

    static getConversation (req, res, next) {
        const { conversationId } = req.params;
        Message.find({ conversationId })
            .select('createdAt body author')
            .sort('-createdAt')
            .populate({
                path: 'author',
                select: 'firstname lastname'
            })
            .exec((err, messages) => {
                if (err) {
                    return Respond(res).error(500, 'messageRetrievalError', `messages could not be retrieved: ${err}`);
                }
                return Respond(res).success({ data: messages });
            })
    }

    static newConversation (req, res, next) {
        const { recipientId } = req.params
        const { composedMessage } = req.body;
        const { _id } = req.user;

        if (!recipientId) {
            return Respond(res).error(422, 'messageCreationError', 'please choose a valid recipient for your message');
        }
        if (!composedMessage) {
            return Respond(res).error(422, 'messageCreationError', 'please enter a message');
        }
        // start conversation with both Ids
        const conversation = new Conversation({
            participants: [_id, recipientId]
        });
        // save conversation
        conversation.save((err, newConversation) => {
            if (err) {
                return Respond(res).error(422, 'messageCreationError', `message could not be created: ${err}`);
            }
            // create new message
            const message = new Message({
                conversationId: newConversation._id,
                body: composedMessage,
                author: _id
            });
            // save message
            message.save((err, newMessage) => {
                if (err) {
                    Respond(res).error(422, 'messageCreationError', `message could not be created: ${err}`);
                    return next(err);
                }
                const data = {
                    conversationId: conversation._id,
                    message: newMessage
                }
                return Respond(res).success({ data });
            })
        });
    }

    static sendReply (req, res, next) {
        const { conversationId } = req.params;
        const { composedMessage } = req.body;
        const { _id } = req.user;

        if (!composedMessage) {
            return Respond(res).error(422, 'messageCreationError', 'please enter a message');
        }
        const reply = new Message({
            conversationId,
            body: composedMessage,
            author: _id
        });

        reply.save((err, sentReply) => {
            if (err) {
                return Respond(res).error(422, 'messageCreationError', `message could not be created: ${err}`);
            }
            return Respond(res).success({ data: sentReply });
        })
    }

    static deleteConversation (req, res, next) {
        const { conversationId } = req.params;
        const { _id } = req.user;

        Conversation.deleteMany({
            $and: [ {'_id': conversationId}, {'participants': _id} ]
        }, (err, conversations) => {
            if (!conversations || conversations.deletedCount < 1) {
                return Respond(res).error(422, 'messageDeletionError', `messages already deleted`);
            }
            if (err) {
                return Respond(res).error(422, 'messageDeletionError', `message could not be deleted: ${err}`);
            }
            return Respond(res).success({ data: 'conversation deleted successfully' });
        })
    }

    static updateMessage (req, res, next) {
        const { messageId } = req.params;
        const { _id } = req.user;
        const { composedMessage } = req.body;

        Conversation.findOneAndRemove({
            $and: [ {'_id': messageId}, { author: _id } ]
        }, (err, message) => {
            if (err) {
                Respond(res).error(422, 'messageUpdateError', `message could not be updated: ${err}`);
                return next(err);
            }
            message.body = composedMessage;
            message.save((e, updatedMessage) => {
                if (err) {
                    Respond(res).error(422, 'messageUpdateError', `message could not be updated: ${err}`);
                    return next(err);
                }
                Respond(res).success({ data: 'message updated successfully' });
                return next();
            })
        })
    }
}

module.exports = ChatController;
