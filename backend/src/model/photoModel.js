import mongoose from "mongoose";

/**
 * Define the Mongoose Schema for a Comment.
 */
const commentSchema = new mongoose.Schema({
  comment: String,
  date_time: { type: Date, default: Date.now },
  user_id: mongoose.Schema.Types.ObjectId,
});

/**
 * Define the Mongoose Schema for a Photo.
 */
const photoSchema = new mongoose.Schema({
  file_name: { type: String, required: true },
  date_time: { type: Date, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comments: [commentSchema],
});


/**
 * Create a Mongoose Model for a Photo using the photoSchema.
 */
const Photo = mongoose.models.Photos || mongoose.model("Photos", photoSchema);

export default Photo;
