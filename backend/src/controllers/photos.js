import Photo from "../model/photoModel.js";
import User from "../model/userModel.js";
import Comment from "../model/commentModel.js";

export const getAllPhotos = async (req, res) => {
  try {
    const photos = await Photo.find().sort({ date_time: -1 });

    const photosWithComments = await Promise.all(
      photos.map(async (photo) => {
        const user = await User.findById(photo.user_id);
        return {
          _id: photo._id,
          user_id: photo.user_id,
          file_name: photo.file_name,
          date_time: photo.date_time,
          comments: photo.comments.map((comment) => ({
            _id: comment._id,
            comment: comment.comment,
            date_time: comment.date_time,
            user: {
              _id: user._id,
              first_name: user.first_name,
              last_name: user.last_name,
            },
          })),
        };
      })
    );

    res.json(photosWithComments);
  } catch (error) {
    console.error("Error fetching all photos:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPhotosByUserId = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "Invalid user id provided" });
    }

    const photos = await Photo.find({ user_id: userId });

    const photosWithComments = photos.map((photo) => ({
      _id: photo._id,
      user_id: photo.user_id,
      file_name: photo.file_name,
      date_time: photo.date_time,
      comments: photo.comments.map((comment) => ({
        _id: comment._id,
        comment: comment.comment,
        date_time: comment.date_time,
        user: {
          _id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
        },
      })),
    }));

    res.json(photosWithComments);
  } catch (error) {
    console.error("Error fetching photos of user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getPhotoById = async (req, res) => {
  const photoId = req.params.id;

  try {
    const photo = await Photo.findById(photoId);

    if (!photo) {
      return res.status(404).json({ error: "Photo not found" });
    }

    res.json(photo);
  } catch (error) {
    console.error("Error fetching photo by id:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createPhoto = async (req, res) => {
  const { file_name, user_id, date_time } = req.body;

  if (!file_name || !user_id || !date_time) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(400).json({ error: "Invalid user id provided" });
    }

    const newPhoto = new Photo({
      file_name,
      date_time,
      user_id,
      comments: []
    });

    await newPhoto.save();

    // Trả về ảnh mới tạo
    res.status(201).json(newPhoto);
  } catch (error) {
    console.error("Error creating photo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createComment = async (req, res) => {
  const { comment, user_id, photo_id } = req.body;

  if (!comment || !user_id || !photo_id) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(400).json({ error: "Invalid user id provided" });
    }

    const photo = await Photo.findById(photo_id);
    if (!photo) {
      return res.status(400).json({ error: "Invalid photo id provided" });
    }

    const newComment = new Comment({
      comment,
      user_id,
      photo_id,
      date_time: Date.now() 
    });

    await newComment.save();

    photo.comments.push(newComment);
    await photo.save();

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
