import mongoose, { model, Schema } from "mongoose";

const SnippetSchema = new Schema(
  {
    title: {
      type: String,
      default: "",
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: false,
    },
    tags: {
      type: [String],
      default: [],
    },
    userId: {
      type: String,
      required: true,
    },
    visibility: {
      type: String,
      default: "private",
    },
    shortcut: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);
export const Snippet =
  mongoose.models.Snippet || model("Snippet", SnippetSchema);
