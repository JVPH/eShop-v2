import jwt from 'jsonwebtoken'

const generateToken = (id) => {
  return jwt.sign({ id },  process.env.SECRET, {
    expiresIn: '4h'
  })
}

export default generateToken