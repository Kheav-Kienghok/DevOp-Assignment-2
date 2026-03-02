import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json()); // middleware for JSON body

// GET APIs
app.get("/", (req, res) => res.send("Welcome to My API"));

app.get("/users", (req, res) =>
  res.json([
    { id: 1, name: "John" },
    { id: 2, name: "Sara" },
  ]),
);

app.get("/status", (req, res) => res.send("API is Running"));

// ✅ POST API
app.post("/users", (req, res) => {
  const user = req.body;

  res.status(201).json({
    message: "User created successfully",
    data: user,
  });
});

// ✅ DELETE API
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  res.json({
    message: `User with id ${id} deleted`,
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
