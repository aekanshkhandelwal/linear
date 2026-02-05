const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env from current directory
dotenv.config({ path: path.join(__dirname, '.env') });

const uri = process.env.MONGO_URI;

if (!uri) {
    console.error('Error: No MONGO_URI found in .env file');
    process.exit(1);
}

console.log('Testing connection to MongoDB Atlas...');
// Mask password in logs
const maskedUri = uri.replace(/:([^:@]+)@/, ':****@');
console.log('URI:', maskedUri);

mongoose.connect(uri)
    .then(() => {
        console.log('SUCCESS: Connected to MongoDB Atlas!');
        console.log('Database Name:', mongoose.connection.name);
        console.log('Host:', mongoose.connection.host);
        process.exit(0);
    })
    .catch(err => {
        console.error('FAILURE: Could not connect to MongoDB Atlas');
        console.error('Error:', err.message);
        process.exit(1);
    });
