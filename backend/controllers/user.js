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
      token: null
    })
  }


}

export { authUser }