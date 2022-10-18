import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String, 
    password: String, 
    email: String,
    gameId: Number,
    key: String,
    enabled: Boolean
});

export default mongoose.model('User', userSchema);