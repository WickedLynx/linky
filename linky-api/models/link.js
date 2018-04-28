const mongoose = require('mongoose');

const linkSchema = mongoose.Schema({
  url: String,
  title: String,
  author: String,
  image: String,
  dateCreated: { type: Date, default: Date.now },
  description: String,
  publisher: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag"
    }
  ]
});

module.exports = mongoose.model("Link", linkSchema);
