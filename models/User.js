const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    username: { 
        type: String, 
        required: true,
        unique: true,
        trim: true
    },
    email: { 
        type: String, 
        required: true,
        unique: true,
        match:
    },
    thoughts: [{
        type: Schema.Types.ObjectID,
        ref: 'thought'
    }],
    friends: [{
        type: Schema.Types.ObjectID,
        ref: 'user'
    }]
});

const User = model('user', userSchema);

module.exports = User;