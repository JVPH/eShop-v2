import mongoose from "mongoose"
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },  
  passwordHash: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
} )

userSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.passwordHash)
}

userSchema.pre('save', async function (next) {
  if(!this.isModified('passwordHash')){
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt)
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {    
    delete returnedObject.__v
    //the password hash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

export default User