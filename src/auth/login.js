import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { prisma } from "../db/prisma.js";
dotenv.config();

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send("Missing email or password");
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(404).send("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).send("Invalid credentials");
    }

    const accessToken = Jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "1d",
      }
    );

    if (user.id) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          token: accessToken,
        },
      });
    }

    res.status(200).json(accessToken);
  } catch (error) {
    console.log(error);
  }
};
