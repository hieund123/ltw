import mongoose from "mongoose";

/**
 * Define the Mongoose Schema for a Comment.
 */
const commentSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  date_time: { type: Date, default: Date.now },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  photo_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Photo', required: true }, 
});

/**
 * Create a Mongoose Model for a Comment using the commentSchema.
 */
const Comment = mongoose.models.Comments || mongoose.model("Comments", commentSchema);

export default Comment;
