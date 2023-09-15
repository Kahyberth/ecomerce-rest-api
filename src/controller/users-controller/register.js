import bcrypt from "bcrypt";
import { prisma } from "../../db/prisma.js";
import { v4 as uuidv4 } from "uuid";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      throw new Error("Please provide all required fields");
    }

    const verifyEmail = await prisma.user.findMany({
      where: {
        email,
      },
    });

    if (!verifyEmail) {
      res.status(409).send("Email already exists");
    }

    const counter = await prisma.user.count();

    let admin = false;
    if (counter === 0) {
      admin = true;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        id: uuidv4(),
        email,
        name: username,
        password: hashedPassword,
        isAdmin: admin,
      },
    });

    res.send(user);
  } catch (error) {
    console.log(error);
  }
};
