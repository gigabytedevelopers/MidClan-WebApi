const mongoose = require('mongoose');
const { Schema } = mongoose;

const ConversationSchema = Schema({
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Conversation', ConversationSchema);
