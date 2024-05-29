const router = require('express').Router();
const usersRoutes = require('./users');
const thoughtsRoutes = require('./thoughts');

// --> /api/users
router.use('/users', usersRoutes);
// ---> /api/thoughts
router.use('/thoughts', thoughtsRoutes);



module.exports = router;