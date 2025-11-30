import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname:  { type: String, required: true },
    email:     { type: String, required: true },
    // extra fields from your Assignment 1 form – optional but useful
    subject:   { type: String },
    message:   { type: String },
  },
  {
    timestamps: true, // adds createdAt / updatedAt
  }
);

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
