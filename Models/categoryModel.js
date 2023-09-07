/**
 * Models/cmspages.js
 *
 * Create mongoDB Schema for the CMS pages.
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const category = new Schema({
  Category_name: {
    type: String,
    required: [true, "Category is required"],
  }
});

const MessageModel = mongoose.model("Category", category);

module.exports = MessageModel;
