import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  location: { type: String },
  description: { type: String },
  occupation: { type: String },
  username: { type: String, required: true, unique: true },  
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

export default User;
