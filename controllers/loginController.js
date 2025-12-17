const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Login = require('../models/Login');

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const loginRecord = new Login({ email });
        await loginRecord.save();

        const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET || 'secret');
        res.json({ token, user: { email: user.email, username: user.username, isAdmin: user.isAdmin || false } });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { loginUser };