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

const loginSchema = new Schema({
  username: String,
  password: String,
});

export const models = [
  {
    name: "Snippet",
    schema: snippetSchema,
    collection: "snippets",
  },
  {
    name: "Login",
    schema: loginSchema,
    collection: "login",
  },
];
