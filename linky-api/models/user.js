const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config.js');

const userSchema = mongoose.Schema({
	username: { type: String, required: true, index: { unique: true }},
	password: { type: String, required: true },
	dateCreated: { type: Date, default: Date.now },
	links: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Link"
		}
	],
	tags: [
	  {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Tag"
	  }
	]
});


userSchema.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password')) return next();

	bcrypt.genSalt(config.saltWorkFactor, function(err, salt) {
		if (err) { return next(err); }

		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return next(err);

			user.password = hash;
			next();
		});
	})
});

linkSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) { return cb(err); }
		cb(null, isMatch);
	})
}

module.exports = mongoose.model('User', userSchema);
