const express = require('express');
const { registerUser, getAllUsers, deleteUser, updateUserRole } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.put('/users/:id/role', updateUserRole);

module.exports = router;