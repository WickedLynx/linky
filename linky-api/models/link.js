const mongoose = require('mongoose');

const linkSchema = mongoose.Schema({
  url: String,
  title: String,
  author: String,
  image: String,
  dateCreated: { type: Date, default: Date.now },
  description: String,
  publisher: String,

  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag"
    }
  ]
});

module.exports = mongoose.model("Link", linkSchema);
