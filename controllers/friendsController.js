const { User } = require('../models');

module.exports = {
  // Add a new friend to a user's friend list
  async addFriend(req, res) {
    try {
      const { userId, friendId } = req.params;

      const user = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { friends: friendId } }, // $addToSet ensures no duplicates
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Remove a friend from a user's friend list
  async removeFriend(req, res) {
    try {
      const { userId, friendId } = req.params;

      const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { friends: friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
