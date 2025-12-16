const express = require('express');
const { registerUser, getAllUsers, deleteUser } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);

module.exports = router;