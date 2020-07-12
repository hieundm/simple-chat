const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
	first_name: {
		type: "String",
	},
	last_name: {
		type: "String",
	},
	company_name: {
		type: "String",
	},
	address: {
		type: "String",
	},
	city: {
		type: "String",
	},
	county: {
		type: "String",
	},
	state: {
		type: "String",
	},
	zip: {
		type: "String",
	},
	phone1: {
		type: "String",
	},
	phone2: {
		type: "String",
	},
	web: {
		type: "String",
	},
	email: {
		type: "String",
		required: true,
		trim: true,
		unique: true,
	},
	password: {
		type: "String",
		required: true,
		trim: true,
	},
	salt: {
		type: "String",
		required: true,
	},
	last_online_at: {
		type: "Number",
	},
	is_active: {
		type: "Boolean",
	},
	is_online: {
		type: "Boolean",
	},
});

const User = mongoose.model("users", userSchema);

/**
 *	Get list user by multiple id
 */
const getUserListByIds = async (ids, optionSelect) => {
	if (!ids || ids.length < 1) {
		return null;
	}

	const query = User.find({
		_id: {
			$in: ids.split(",").map((x) => mongoose.Types.ObjectId(x)),
		},
	});

	if (optionSelect) {
		query.select(optionSelect);
	}

	const lstUser = await query.exec();

	if (!lstUser || lstUser.length < 1) {
		return null;
	}

	return lstUser;
};

module.exports = {
	User,
	getUserListByIds,
};
