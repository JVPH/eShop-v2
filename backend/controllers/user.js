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

// @desc Auth user and get token
// @route POST /api/users/login
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
  }
}

export { authUser, registerUser ,getUserProfile }