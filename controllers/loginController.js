const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Login = require('../models/Login');

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === 'admin@techstore.com' && password === 'admin123') {
            const token = jwt.sign({ email, isAdmin: true }, process.env.JWT_SECRET || 'secret');
            return res.json({ token, user: { email, username: 'Admin', isAdmin: true } });
        }

        const user = await User.findOne({ email });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const loginRecord = new Login({ email });
        await loginRecord.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret');
        res.json({ token, user: { email: user.email, username: user.username } });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { loginUser };