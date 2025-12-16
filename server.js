const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routers/userRoutes');
const loginRoutes = require('./routers/loginRoutes');
const contactRoutes = require('./routers/contactRoutes');
const productRoutes = require('./routers/productRoutes');

const app = express();

app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://your-frontend-domain.com'] 
        : ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5173'],
    credentials: true
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('✅ MongoDB connected successfully');
    console.log('💾 Database: techstore');
})
.catch(error => {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('🔍 Steps to fix:');
    console.log('1. Go to MongoDB Atlas Dashboard');
    console.log('2. Database Access → Create user: mathugowshic10 / superstar');
    console.log('3. Network Access → Add IP: 0.0.0.0/0');
    console.log('4. Ensure cluster is not paused');
    process.exit(1);
});

app.use('/api', userRoutes);
app.use('/api', loginRoutes);
app.use('/api', contactRoutes);
app.use('/api', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));