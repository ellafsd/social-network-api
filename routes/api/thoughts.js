const router = require('express').Router();
const Thought = require('../../model/Thought');
const User = require('../../model/User');


// GET all thoughts
// ---> /api/thoughts/
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single thought by its _id
router.get('/:id', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this id!' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST to create a new thought
router.post('/', async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);
    await User.findByIdAndUpdate(
      req.body.userId,
      { $push: { thoughts: newThought._id } },
      { new: true }
    );
    res.json(newThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT to update a thought by its _id
router.put('/:id', async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedThought) {
      return res.status(404).json({ message: 'No thought found with this id!' });
    }
    res.json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Remove a thought by its _id
router.delete('/:id', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.id);
    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this id!' });
    }
    res.json({ message: 'Thought deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST to create a reaction stored in a single thought's reactions array field
router.post('/:thoughtId/reactions', async (req, res) => {
  try {
      // finds the thought by id and adds a new reaction
      const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body } }, { new: true })
      if (!thought) return res.status(404).json({ message: 'Thought not found' });

      res.status(201).json(thought);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
});

//Using DELETE to pull and remove a reaction by the reaction's reactionId value
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
      // Finds thought by id
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) return res.status(404).json({ message: 'Thought not found' });

      // Finds reaction by id
      const reaction = thought.reactions.find(
          reaction => reaction.reactionId.toString() === req.params.reactionId
      );
      if (!reaction) return res.status(404).json({ message: 'Reaction not found' })

      // Removes the selected reaction from thought id
      thought.reactions.pull(reaction);
      const updatedThought = await thought.save();
      res.json(updatedThought);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});


module.exports = router;


// router.post('/:thoughtId/reactions', async (req, res) => {
//   try {
//     console.log('Request Body:', req.body);
//     const thought = await Thought.findByIdAndUpdate(
//       req.params.thoughtId,
//       { $push: { reactions: req.body } },
//       { new: true }
//     );
//     if (!thought) {
//       return res.status(404).json({ message: 'No thought found with this id!' });
//     }
//     res.json(thought);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // DELETE to pull and remove a reaction by the reaction's reactionId value
// router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
//   try {
//     const thought = await Thought.findByIdAndUpdate(
//       req.params.thoughtId,
//       { $pull: { reactions: { reactionId: req.params.reactionId } } },
//       { new: true }
//     );
//     if (!thought) {
//       return res.status(404).json({ message: 'No thought found with this id!' });
//     }
//     res.json(thought);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;
