import mongoose, { model, Schema } from "mongoose";

const TagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    default: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);
export const Tag = mongoose.models.Tag || model("Tag", TagSchema);
