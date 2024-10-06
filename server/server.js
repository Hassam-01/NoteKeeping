"use client";
const express = require("express");
const app = express();
const db = require("./db/");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config("../.env");
const cookieParser = require("cookie-parser");

const salt = 10;
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(cookieParser());

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error("Error verifying token:", err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
app.get("/", verifyUser, (req, res) => {
  res.status(200).json({ message: "user verified", id: req.userId });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});

// ! Routing to home page
app.get("/homes", async (req, res) => {
  try {
    const users = await db.select("*").from("users");
    console.log(users);
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Server error");
  }
});

// ! routing to user page (this will be same as the home page)
app.get("/:id/home/", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await db("users").where("id", id).first();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Server error");
  }
});

// ! routing to notes page
app.get("/:id/home/notes/", async (req, res) => {
    try {
      const id = req.params.id;
  
      // Fetch the account status
      const user = await db("account")
        .join("users", "account.user_id", "users.id")
        .select("account.account_status")
        .where("users.id", id)
        .first();
  
      if (!user || user.account_status === undefined) {
        return res.status(404).json({ message: "User or Account not found" });
      }
  
      const { account_status } = user;
  
      if (account_status) {
        // Fetch notes
        const notes = await db("notes")
          .where("user_id", id)
          .select("*");
  
        // Fetch drawings
        const drawings = await db("drawing").where("user_id", id).select("*");
  
        // Convert the drawing image data (bytea) to base64
        const drawingsWithBase64Images = drawings.map((drawing) => ({
          ...drawing,
          drawing_img: drawing.drawing_img
            ? drawing.drawing_img.toString("base64") // Convert bytea to base64
            : null,
        }));
  
        return res.status(200).json({ notes, drawing: drawingsWithBase64Images });
      } else {
        return res.status(403).json({ message: "Account is inactive" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
  

app.put("/:id/home/notes/drawing/:drawing_id", verifyUser, async (req, res) => {
  const { title, drawing, drawing_img } = req.body;
  const drawing_id = req.params.drawing_id;

  try {
    const buffer = Buffer.from(drawing_img, 'base64');
    const updatedDrawing = await db("drawing")
      .where({
        drawing_id: drawing_id,
      })
      .update({
        title: title,
        drawing: JSON.stringify(drawing),
        drawing_img: buffer
      });
    if (updatedDrawing === 0) {
      return res.status(404).json({ message: "Drawing not found" });
    }

    res.status(200).json({ message: "Drawing updated successfully" });
  } catch (err) {
    console.error("Error updating drawing:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/:id/home/notes/:notesId", async (req, res) => {
  const id = req.params.id;
  const notesId = req.params.notesId;

  try {
    // Delete the note from the database
    const deletedRows = await db("notes")
      .where({
        note_id: notesId,
      })
      .del();

    if (deletedRows === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    console.error("Error deleting note:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
app.delete("/:id/home/notes/drawing/:drawing_id", async (req, res) => {
  const drawingId = req.params.drawing_id;

  try {
    // Delete the note from the database
    const deletedRows = await db("drawing")
      .where({
        drawing_id: drawingId,
      })
      .del();

    if (deletedRows === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    console.error("Error deleting note:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/:id/home/notes/post", verifyUser, async (req, res) => {
  const id = req.params.id;
  const { title, text } = req.body;
  console.log("api hitted post");
  try {
    const newNote = await db("notes").insert({
      title: title,
      text: text,
      user_id: id,
    });
    res.status(200).json({ message: "Note created successfully" });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
app.post("/:id/home/notes/drawing/post", verifyUser, async (req, res) => {
  const id = req.params.id;
  const { title, drawing, drawing_img } = req.body;
  try {
    const buffer = Buffer.from(drawing_img, 'base64');
    const newDrawing = await db("drawing").insert({
      title: title,
      drawing: JSON.stringify(drawing),
      drawing_img: buffer,
      user_id: id,
    });
    res.status(200).json({ message: "Note created successfully" });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/register", async (req, res) => {
  const { email, password, first_name, last_name } = req.body;
  let userID;
  bcrypt.hash(password.toString(), salt, async (err, hash) => {
    if (err) return res.status(500).json({ message: "Internal Server Error" });

    try {
      const insertedUsers = await db("users")
        .insert({
          first_name: first_name,
          last_name: last_name,
        })
        .returning("id");
      userID = insertedUsers[0].id;

      res
        .status(200)
        .json({ message: "User created successfully", userId: userID });
    } catch (err) {
      console.error("Error creating user:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
    try {
      await db("authentication").insert({
        email: email,
        hash: hash,
        userid: userID,
      });
    } catch (err) {
      await db.delete().from("account").where("user_id", userID);
      await db.delete().from("users").where("id", userID);
      console.error("Error creating user:", err);
    }
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db("authentication").where("email", email).first();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    bcrypt.compare(password, user.hash, (err, result) => {
      if (err)
        return res.status(500).json({ message: "Internal Server Error" });
      if (result) {
        const id = user.userid;
        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });

        res.cookie("token", token, { httpOnly: true });
        res
          .status(200)
          .json({ message: "Login successful", userId: user.userid });
      } else {
        res.status(401).json({ message: "Incorrect password" });
      }
    });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//  * listening
app.listen(3009, () => {
  console.log("Server is running on port 3009");
});
