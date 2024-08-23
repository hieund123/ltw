import React, { useEffect, useState } from "react";
import "./Post.css";
import axios from "axios";
import { Modal, Button, Input } from "antd";

const { TextArea } = Input;

const Posts = () => {
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [userMap, setUserMap] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8888/api/photos/all"
        );
        setPhotos(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching photos:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUser = async (userId) => {
      try {
        const response = await axios.get(
          `http://localhost:8888/api/auth/getuser/${userId}`
        );
        setUserMap((prevState) => ({
          ...prevState,
          [userId]: response.data.user,
        }));
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (selectedPhoto) {
      selectedPhoto.comments.forEach((comment) => {
        const userId = comment.user_id;
        if (!userMap[userId]) {
          fetchUser(userId);
        }
      });
    }
  }, [selectedPhoto]);

  const handlePhotoClick = async (photoId) => {
    try {
      const response = await axios.get(
        `http://localhost:8888/api/photos/info/${photoId}`
      );
      setSelectedPhoto(response.data);
      setModalVisible(true);
    } catch (error) {
      console.error("Error fetching photo details:", error);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleCreateComment = async () => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData) {
        console.error("User data not found in local storage");
        return;
      }

      const user = JSON.parse(userData);

      const userId = user._id;

      const newComment = {
        comment: commentText,
        user_id: userId,
        photo_id: selectedPhoto._id,
      };

      const response = await axios.post(
        "http://localhost:8888/api/photos/createcmt",
        newComment
      );
      console.log("Comment created successfully:", response.data);

      const updatedPhoto = { ...selectedPhoto };
      updatedPhoto.comments = [...selectedPhoto.comments, response.data];
      setSelectedPhoto(updatedPhoto);

      setCommentText("");
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  return (
    <div className="posts-container">
      <div className="content">
        <h2>Chào mừng đến với trang post!</h2>
        <p>Nội dung trang post:</p>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="photos-container">
            {photos.map((photo) => (
              <div
                key={photo._id}
                className="photo-item"
                onClick={() => handlePhotoClick(photo._id)}
              >
                <img src={photo.file_name} alt={photo.file_name} />
                <p>Date: {photo.date_time}</p>
              </div>
            ))}
          </div>
        )}
        <Modal
          title={selectedPhoto ? "Photo Details" : ""}
          open={modalVisible}
          onCancel={closeModal}
          footer={[
            <Button key="cancel" onClick={closeModal}>
              Close
            </Button>,
          ]}
        >
          {selectedPhoto && (
            <div>
              <img
                src={selectedPhoto.file_name}
                alt={selectedPhoto.file_name}
              />
              <h3>Comments:</h3>
              <ul>
                {selectedPhoto.comments.map((comment, index) => (
                  <li key={index}>
                    {userMap[comment.user_id] &&
                      userMap[comment.user_id].username}
                    : {comment.comment}
                  </li>
                ))}
              </ul>
              <div>
                <TextArea
                  rows={4}
                  value={commentText}
                  onChange={handleCommentChange}
                />
                <Button type="primary" onClick={handleCreateComment} style={{marginTop:"10px"}}>
                  Add Comment
                </Button>{" "}
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Posts;
