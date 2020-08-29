const _ = require("lodash");
const mongoose = require("mongoose");
const StringBuffer = require("../helpers/string-buffer");
const userSchema = new mongoose.Schema({
	avatar: {
		type: "String",
	},
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

const UserModel = mongoose.model("users", userSchema);

//https://stackoverflow.com/questions/42476367/es6-classes-to-extend-mongoose-model
class User extends UserModel {
	constructor(user) {
		super(user);

		this.data = null;
	}

	instance(){
		return UserModel;
	}

	async get(id){
		const user = await User.findOne({ _id: id });

		if (_.isEmpty(user) === true) {
			return null;
		}

		return user;
	}

	async getUserListByIds(ids, optionSelect) {
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
	}

	async getByEmail(email) {
		const user = await User.findOne({ email: email });

		if(_.isEmpty(user) === true)
		{
			return null;
		}

		this.set(user);

		return this.data;
	}

	async getListByEmails(arEmail){
		if (_.isEmpty(arEmail) === true){
			return null;
		}

		const users = await User.find({ email: { $in: arEmail} });

		if (_.isEmpty(users) === true) {
			return null;
		}

		return users;
	}

	getDisplayName() {
		const sb = new StringBuffer();

		sb.append(this.data.first_name).append(" ").append(this.data.last_name);

		return sb.toString();
	}

	set(user){
		this.data = user;
	}
}

module.exports = new User();
