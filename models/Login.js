const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    loginTime: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Login', loginSchema);