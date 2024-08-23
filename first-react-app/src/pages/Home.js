import React, { useState } from "react";
import axios from "axios";
import "./Home.css";
const Home = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8888/api/photos/create",
        {
          file_name: fileName,
          user_id: userData._id,
          date_time: new Date(),
        }
      );

      console.log("Photo created successfully:", response.data);
    } catch (error) {
      console.error("Error creating photo:", error);
    }
    setLoading(false);
  };

  
  return (
    <div className="home-container">
      <h2>Đăng ảnh mới</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit} disabled={!file || loading}>
        {loading ? "Đang tải lên..." : "Đăng ảnh"}
      </button>
    </div>
  );
};

export default Home;
