const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {

        },
        email: {

        },
        thoughts: {

        },
        friends: {

        }
    }
);

const User = model('User', UserSchema);

module.exports = User;