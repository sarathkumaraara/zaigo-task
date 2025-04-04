import { model, Schema } from "mongoose"

const taskSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  description: {
    type: String
  },
  status: {
    type: String,
    default: "todo"
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  createdAt: {
    type: Date,
  }
}, {
  strict: false,
  collection: "tasks",
  versionKey: false
})

taskSchema.pre("save", async function (next) {
  if (!this.createdAt) {
    this.createdAt = Date.now();
  }
  next();
})

export default model("tasks", taskSchema)