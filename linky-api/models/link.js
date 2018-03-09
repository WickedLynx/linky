const mongoose = require('mongoose');

const linkSchema = mongoose.Schema({
  url: String,
  title: String,

  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag"
    }
  ]
});

module.exports = mongoose.model("Link", linkSchema);
