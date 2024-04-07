const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const emailRoutes = require('./routes/emailRoutes');
const { EmailSchema } = require('./models/MailModel');

require('dotenv').config();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

const connectWithRetry = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
        startServer();
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error.message);
        console.log('Retrying connection in 5 seconds...');
        setTimeout(connectWithRetry, 5000);
    }
};

const insertInitialEmails = async () => {
    const friendsEmail = [
        { address: "one@gmail.com" },
        { address: "two@gmail.com" },
        { address: "three@gmail.com" },
        { address: "four@gmail.com" },
        { address: "five@gmail.com" },
    ];

    for (const email of friendsEmail) {
        try {
            const existingEmail = await EmailSchema.findOne({ address: email.address });
            if (!existingEmail) {
                await EmailSchema.create({
                    address: email.address,
                    referees: []
                });
                console.log(`Email ${email.address} inserted successfully`);
            } else {
                console.log(`Email ${email.address} already exists, skipping insertion`);
            }
        } catch (error) {
            console.error(`Error inserting email ${email.address}:`, error);
        }
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
        insertInitialEmails();
    });
};

connectWithRetry();

app.use("/api/users", userRoutes);
app.use("/api/users", emailRoutes);
