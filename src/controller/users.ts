import { Request, Response, NextFunction } from "express";
import User from "../model/users";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../middleware/userAuthentication";
import multer from "multer";
import path from "path";

export const updateUserPhoto = async (req: Request, res: Response) => {
  try {
    console.log("did you loguser photo");
    const userId = (req.session as any).userId;
    console.log("User ID:", userId);
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      const userPhoto = req.file?.path;
      console.log("User Photo:", userPhoto);
      Object.assign(user, { photo: userPhoto });

      await user.save();
      console.log("did you save user photo");
      (req.session as any).photo = user.photo;

      console.log("Session after update:", req.session);

      return res.redirect("/user/dashboard");
      // .status(200)
      // .json({ message: "User photo updated successfully", user })
    }
  } catch (error: any) {
    console.error("Error updating User photo:", error);
    console.log("I have err", error);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use" });
    }
    const password = req.body.password;

    if (!isValidPassword(password)) {
      return res.status(400).json({
        error:
          "Password must be at least 5 characters long and contain at least one uppercase letter, one lowercase letter, and one special character",
      });
    }
    const hashpassword = bcrypt.hashSync(password, 10);
    const newUser = await User.create({
      ...req.body,
      password: hashpassword,
    });
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const isValidPassword = (password: string): boolean => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{5,}$/;
  return passwordRegex.test(password);
};

export const getUserInfo = async (req: Request, res: Response) => {
  try {
    const userId = (req.session as any).userId;
    console.log("User ID:", userId);

    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password", "cleanerId", "id"] },
    });

    console.log("User Data:", user);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res
        .status(200)
        .json({ message: "User information retrieved successfully", user });
    }
  } catch (error) {
    console.error("Error getting user information", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await User.findAll();

    if (allUsers) {
      res.status(201).json({
        message: "All User's Retrieved Successfully",
        User: allUsers,
      });
    } else {
      res.status(404).json({ message: "No User Found" });
    }
  } catch (error) {
    console.error("Error getting all Users", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// View details of a single user
export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      res.status(404).json({ message: "User Data not found" });
    } else {
      res
        .status(201)
        .json({ message: "User Retrieved successfully", User: user });
    }
  } catch (error) {
    console.error("Error getting User details", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const editUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    Object.assign(user, req.body);

    await user.save();

    return res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating User:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const deletedUser = await User.findOne({ where: { id: userId } });

  if (!deletedUser) {
    res.status(404).json({ message: "User not found" });
  } else {
    await deletedUser.destroy();
  }
  res
    .status(201)
    .json({ message: "User deleted successfully", User: deletedUser });
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).send({ message: "Email or password missing" });
  }

  try {
    const user = await User.findOne({ where: { email:email } });
    //console.log(user)
    if (!user) {
      return res.status(404).send({ message: "Email does not Exist" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(404).send({ message: "Invalid Password" });
    }

    // items inside of the session

    const accessToken = generateAccessToken(user);
    const userId = user.id;
    const fullname = user.fullname;
    const gender = user.gender;
    const phonenumber = user.phonenumber;
    const address = user.address;
    const dateofbirth = user.dateofbirth;
    const occupation = user.occupation;
    const photo = user.photo;

    (req.session as any).token = accessToken;
    (req.session as any).userId = userId;
    (req.session as any).isAdmin = user.isAdmin;
    (req.session as any).fullname = fullname;
    (req.session as any).email = email;
    (req.session as any).gender = gender;
    (req.session as any).phonenumber = phonenumber;
    (req.session as any).address = address;
    (req.session as any).dateofbirth = dateofbirth;
    (req.session as any).occupation = occupation;
    (req.session as any).photo = photo;

    console.log("Session after login:", req.session);

    next();
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
