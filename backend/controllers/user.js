import generateToken from '../utils/generateToken.js'
import User from '../models/user.js'


// @desc Auth user and get token
// @route POST /api/users/login
// @access Public
const authUser = async (req, res) => {
  const { email, password } = req.body
  
  const user = await User.findOne({ email })

  if(!(user && (await user.matchPassword(password)))) {
    res.status(401)
    throw new Error('Invalid email or password')
  }else {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  }
}

// @desc Register user and get token
// @route POST /api/users/
// @access Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if(userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    passwordHash: password
  })

  if(user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
}

// @desc Get user profile
// @route POST /api/users/profile
// @access Private
const getUserProfile = async (req, res) => {
  const user = req.user

  if(user){
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
}

// @desc Get user by Id
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
}

// @desc Update user by Id
// @route PUT /api/users/:id
// @access Private/Admin
const updateUserById = async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = (req.body.isAdmin === true || req.body.isAdmin === false) ? req.body.isAdmin : user.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,      
    })

  } else {
    res.status(404)
    throw new Error('User not found')
  }
}

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = async (req, res) => {
  const user = req.user

  

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if(req.body.password){      
      user.passwordHash = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,      
    })

  } else {
    res.status(404)
    throw new Error('User not found')
  }
}

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
const getAllUsers = async (req, res) => {
  const users = await User.find({})
  res.json(users)
}

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = async (req, res) => {

  const user = await User.findById(req.params.id)
  if(user){
    await User.findByIdAndDelete(req.params.id)
    res.json({ message: 'User removed' })
  }else {
    throw new Error('User not found')
  }
  
  
  res.json(response)
}

export { authUser, registerUser , getUserProfile, updateUserProfile, getAllUsers, deleteUser, getUserById, updateUserById }