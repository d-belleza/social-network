const { Schema, model } = require('mongoose');
const moment = require('moment');

const ReactionSchema = new Schema(
    {
        reactionId: {

        },
        reactionBody: {

        },
        username: {

        },
        createdAt: {

        }
    }
);

const ThoughtSchema = new Schema(
    {
        thoughtText: {

        },
        createdAt: {

        },
        username: {

        },
        reactions: {

        }
    }
);


const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
