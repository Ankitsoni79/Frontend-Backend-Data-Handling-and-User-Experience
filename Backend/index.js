const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let users = [];

// ✅ GET API
app.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

// ✅ POST API
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
  };

  users.push(newUser);
  res.status(201).json({
    message: "User added successfully",
    user: newUser,
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
