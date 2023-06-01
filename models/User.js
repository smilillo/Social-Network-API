const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    username: { 
        type: String, required: true 
    },
    email: { 
        type: String, required: true 
    },
    thoughts: [{

    }],
    friends: [{

    }]
});

const User = model('user', userSchema);

module.exports = User;