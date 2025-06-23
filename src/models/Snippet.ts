import mongoose, { model, Schema } from "mongoose";

const SnippetSchema = new Schema(
  {
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: false,
    },
    ownerId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
export const Snippet = model.Snippet || model("Snippet", SnippetSchema);
