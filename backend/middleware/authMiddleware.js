import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const protect = async (req, res, next) => {

  let token
  const authorization = req.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = authorization.substring(7)

    const decoded = jwt.verify(token, process.env.SECRET)
    
    req.user = await User.findById(decoded.id)
  }

  if(!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }

  next()
}

export { protect }