import { model, Schema } from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is Required'],
    },
    email: {
      type: String,
      required: [true, 'email_id is Required'],
      unique: [true, 'email_id must be unique2']
    },
    password: {
      type: String,
      required: [true, 'password is Required']
    },
    role: {
      type: String,
      required: [true, 'role is Required']
    },
    createdAt: {
      type: Date,
    }
  },
  {
    collection: "users",
    versionKey: false
  })

userSchema.pre("save", async function (next) {
  if (!this.created_on) {
    this.created_on = Date.now();
  }
  if (this.isNew) {
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
  }
  next();
})


userSchema.pre("findOneAndUpdate", function (next) {
  this._update.updated_on = Date.now();
  next();
})

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

export default model("users", userSchema)