const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    // GET all thoughts
    getThoughts(req, res) {
        Thought.find({})
        // .select('-__v')
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    // GET single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .select('-__v')
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with that ID' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
    // POST thought
    createThought(req, res) {
        Thought.create(req.body)
        .then(({ thought }) => {
            return User.findOneAndUpdate(
              { _id: req.body.userId },
              { $push: { thoughts: thought._id } },
              { new: true }
            );
          })
          .then((user) => {
            if (!user) {
              return res
                .status(404).json({ message: "No user with this username" });
            }
            res.json({ message: "Thought created" });
          })
          .catch((err) => res.json(err));
      },
    // PUT thought by id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
    // DELETE thought by id
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this id' })
              : Reaction.deleteMany({ _id: { $in: thought.reactions } })
          )
          .then(() => res.json({ message: 'Thought deleted!' }))
          .catch((err) => res.status(500).json(err));
      },
    // POST reaction to a thought
    addReaction(req, res) {
        console.log('You are adding a reaction');
        console.log(req.body);
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res
                  .status(404)
                  .json({ message: 'No thought found with that id' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
    // DELETE reaction by id
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res
                  .status(404)
                  .json({ message: 'No thought found with that id' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
};