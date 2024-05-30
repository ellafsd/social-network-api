const router = require('express').Router();
const User = require('../../model/User'); 

// Add a new friend to a user's friend list
router.post('/:userId/friends/:friendId', async (req, res) => {
  try {
    const  userId = req.params.userId;
    const friendId = req.params.friendId;
    console.log(userId);
    // Find the user and add the friendId to the friends array
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } },    // $addToSet ensures no duplicates
      { new: true }   // Return the updated document
    );


    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Remove a friend from a user's friend list
router.delete('/:userId/friends/:friendId', async (req, res) => {
  try {
    const { userId, friendId } = req.params;

    // Find the user and remove the friendId from the friends array
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } },
      { new: true }     // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
