const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const emailRoutes = require('./routes/emailRoutes');

require('dotenv').config();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

let serverStarted = false

const connectWithRetry = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
        if (!serverStarted){
            startServer();
        }
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error.message);
        console.log('Retrying connection in 5 seconds...');
       setTimeout(connectWithRetry,5000)
    }
};


mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Lost MongoDB connection. Attempting to reconnect...');
    connectWithRetry();
});

const startServer = () => {
    app.listen(process.env.PORT, () => {
        console.log(`Server started listening on port ${process.env.PORT}`);
        serverStarted=true
    });
};

connectWithRetry();

app.use("/api/users", userRoutes);
app.use("/api/users", emailRoutes);
