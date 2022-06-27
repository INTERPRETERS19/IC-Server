var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({

	img:
	{
		data: Buffer,
		contentType: String
	},

    driver_assigned: {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
});

module.exports = new mongoose.model('Image', imageSchema);
