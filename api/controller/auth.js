import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  const query = "SELECT * FROM users WHERE email = $1 OR username = $2";
  db.query(query, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.rows.length) return res.status(409).json("User already exists!");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const query = "INSERT INTO users(username, email, password) VALUES ($1, $2, $3)";
    const values = [req.body.username, req.body.email, hash];

    db.query(query, values, (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

export const login = (req, res) => {
  const query = "SELECT * FROM users WHERE username = $1";
  db.query(query, [req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.rows.length === 0) return res.status(404).json("User not found!");

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data.rows[0].password
    );

    if (!isPasswordCorrect) return res.status(400).json("Wrong username or password!");

    const token = jwt.sign({ id: data.rows[0].id }, "jwtkey");
    const { password, ...other } = data.rows[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};