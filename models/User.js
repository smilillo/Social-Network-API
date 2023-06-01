const { Schema, model } = require('mongoose');

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
        // found in stackoverflow forum: https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts: [{
        type: Schema.Types.ObjectID,
        ref: 'thought'
    }],
    friends: [{
        type: Schema.Types.ObjectID,
        ref: 'user'
    }]
},
{
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
});

userSchema.virtual('friendCount').get(function(){
    return this.friends.length
});

const User = model('user', userSchema);

module.exports = User;