const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
  name: String,

  links: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Link"
    }
  ]
});

module.exports = mongoose.model("Tag", tagSchema);
