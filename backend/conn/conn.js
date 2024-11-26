const mongoose = require('mongoose');

const conn = async () => {
    try {
        const response = await mongoose.connect(process.env.MONGO_URI);
        // const response = await mongoose.connect(`${process.env.MONGO_URI}`);
        if (response) {
            console.log('Database connected');
        }
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};

conn();
