const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema({
    thoughtText: { 
        type: String, 
        required: true,
        min: 1,
        max: 280 
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // getter method to format
        get: (timestamp) => dateFormat(timestamp)
    },
    username: { 
        type: String, 
        required: true 
    },
    reactions: [reactionSchema]
},
{
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
});

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;