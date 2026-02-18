import mongoose, { Schema } from "mongoose";

const usertwoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Usertwo || mongoose.model("Usertwo", usertwoSchema);
