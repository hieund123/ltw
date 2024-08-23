const express = require("express");
const Users = require("../model/userModel");
const router = express.Router();

router.get("/list", async (request, response) => {
  try {
    const users = await Users.find({}, "_id first_name last_name");
    response.json(users);
  } catch (error) {
    console.error("Error fetching user list:", error);
    response.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (request, response) => {
  const userId = request.params.id;

  try {
    const user = await Users.findById(userId);

    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }

    response.json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    response.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
