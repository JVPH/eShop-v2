import generateToken from "../utils/generateToken.js";
import { users } from "../models/user.js";
import { db } from "../config/db.js";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

// @desc Register user and get token
// @route POST /api/users/
// @access Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, data: null, message: "Name is required" });
  }
  if (!email) {
    return res
      .status(400)
      .json({ success: false, data: null, message: "Email is required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ success: false, data: null, message: "Password is required" });
  }
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (existingUser.length > 0) {
    return res
      .status(400)
      .json({ success: false, data: null, message: "User already exists" });
  }
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const resultData = await db
    .insert(users)
    .values({ name, email, passwordHash })
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
      isAdmin: users.isAdmin,
    });

  const user = resultData[0];

  // todo: validate that the token gets created
  return res.status(201).json({
    success: true,
    data: { token: generateToken(user.id), ...user },
    message: "Added successfully",
  });
};

// @desc Auth user and get token
// @route POST /api/users/login
// @access Public
const authUser = async (req, res) => {
  const { email, password } = req.body;

  const resultData = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (resultData.length <= 0) {
    return res
      .status(400)
      .json({ success: false, data: null, message: "User doesn't exist" });
  }

  const user = resultData[0];

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatches) {
    res.status(401);
    throw new Error("Invalid email or password");
  } else {
    res.json({
      success: true,
      data: { token: generateToken(user.id), ...user },
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user.id),
      },
      message: "Successful Login",
    });
  }
};

// @desc Get user profile
// @route POST /api/users/profile
// @access Private
const getUserProfile = async (req, res) => {
  const user = req.user;

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

// @desc Get user by Id
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = async (req, res) => {
  // const user = await User.findById(req.params.id);
  const resultData = await db
    .select()
    .from(users)
    .where(eq(users.id, req.params.id));

  if (resultData.length <= 0) {
    return res
      .status(404)
      .json({ success: false, data: null, message: "User not found" });
  }

  const user = resultData[0];

  return res.json({
    success: true,
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
  });
};

// @desc Update user by Id
// @route PUT /api/users/:id
// @access Private/Admin
const updateUserById = async (req, res) => {
  // const user = await User.findById(req.params.id);

  const resultData = await db
    .select()
    .from(users)
    .where(eq(users.id, req.params.id));

  if (resultData.length <= 0) {
    return res
      .status(404)
      .json({ success: false, data: null, message: "User not found" });
  }

  const user = resultData[0];
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.isAdmin =
    req.body.isAdmin === true || req.body.isAdmin === false
      ? req.body.isAdmin
      : user.isAdmin;

  const updatedUser = await db
    .update(users)
    .set(user)
    .where(eq(users.id, req.params.id))
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
      isAdmin: users.isAdmin,
    });

  return res.status(200).json({
    success: true,
    data: updatedUser[0],
    message: "User updated successfully",
  });
};

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = async (req, res) => {
  const user = req.user;

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.passwordHash = req.body.password;
    }

    const updatedUser = await db
      .update(users)
      .set(user)
      .where(eq(users.id, user.id))
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        isAdmin: users.isAdmin,
      });
    // todo: validate that the row is returned
    return res.status(200).json({
      success: true,
      data: updatedUser[0],
      message: "User updated successfully",
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
const getAllUsers = async (req, res) => {
  const existingUsers = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      isAdmin: users.isAdmin,
      createdAt: users.timestamp,
    })
    .from(users);
  res.json(existingUsers);
};

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = async (req, res) => {
  const result = await db
    .delete(users)
    .where(eq(users.id, req.params.id))
    .returning();
  if (result.length > 0) {
    res.json({ message: "User removed" });
  } else {
    throw new Error("User not found");
  }
};

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUserById,
};
