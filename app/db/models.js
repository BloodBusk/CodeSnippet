import { mongoose } from "mongoose";

const { Schema } = mongoose;

const snippetSchema = new Schema({
  title: String,
  language: String,
  snippet: String,
  description: String,
  favorite: Boolean,
  createdAt: Date,
  updatedAt: Date,
});

export const models = [
  {
    name: "Snippet",
    schema: snippetSchema,
    collection: "snippets",
  },
];
