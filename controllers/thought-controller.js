const { Thought, User } = require('../models');

const thoughtController = {
    
    //get all thoughts
    getThoughts(req,res){
        Thought.find({})
            .sort({ createdAt: -1})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    //get thought by id
    getThoughtById({ params }, res){
        Thought.findOne({ _id: params.id})
            .then(dbThoughtData => {
                // If no thought is found, send 404
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //create thought
    createThought({ body }, res){
        Thought.create(body)
            .then(dbThoughtData => {
                return User.findOneAndUpdate(
                    { _id: body.userId},
                    { $push: { thoughts: dbThoughtData._id }},
                    { new: true}
                );
            })
            .then(dbUserData => {
                // If no user is found, send 404
                if (!dbUserData) {
                    res.status(404).json({ message: 'Thought created but no user found with this id' });
                    return;
                }
                res.json({ message: 'Thought created'});
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //update thought
    updateThought({ params, body}, res){
        Thought.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true })
            .then(dbThoughtData => {
                // If no thought is found, send 404
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //delete thought
    deleteThought({ params }, res){
        Thought.findOneAndDelete({ _id: params.id})
            .then(dbThoughtData => {
                // If no thought is found, send 404
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                return User.findOneAndUpdate(
                    { thoughts: params.id },
                    { $pull: { thoughts: params.id}},
                    { new: true}
                );
            })
            .then(dbUserData => {
                // If no user is found, send 404
                if (!dbUserData) {
                    res.status(404).json({ message: 'Thought created but no user found with this id' });
                    return;
                }
                res.json({ message: 'Thought created'});
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },


    //REACTION METHODS
    //add friend
    addReaction({ params, body }, res){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body} },
            { new: true, runValidators: true })
            .then(dbThoughtData => {
                // If no thought is found, send 404
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //remove friend
    removeReaction({ params, body }, res){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId}} },
            { new: true})
            .then(dbThoughtData => {
                // If no thought is found, send 404
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
};

module.exports = thoughtController;