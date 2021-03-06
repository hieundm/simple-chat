const _ = require("lodash");
const automapper = require("automapper-ts");


/**
 * SourceObject: source | Destination: your key which you wanna map
 */
const autoMapper = (sourceObject, destination) => {
	if(_.isEmpty(sourceObject) === true){
		throw "Your source can not be null!!!!!!!!";
	}

	if(_.isEmpty(destination) === true){
		throw "Please tell me what the key you wanna map ???";
	}

	switch (destination.toLowerCase()) {
		case "basic-user":
			automapper
				.createMap("basic-user", "user")
				.ignoreAllNonExisting()
				.forMember("email", function (opts) {
					opts.mapFrom("email");
				})
				.forMember("avatarUrl", function (opts) {
					opts.mapFrom("avatar");
				})
				.forMember("displayName", function (opts) {
					return `${opts.sourceObject.last_name} ${opts.sourceObject.first_name}`;
				});
		case "get":
			automapper
				.createMap("get", "user")
				.ignoreAllNonExisting()
				.forMember("id", function (opts) {
					opts.mapFrom("_id");
				})
				.forMember("displayName", function (opts) {
					console.log(opts);
					return `${opts.sourceObject.last_name} ${opts.sourceObject.first_name}`;
				})
				.forMember("companyName", function (opts) {
					opts.mapFrom("company_name");
				})
				.forMember("address", function (opts) {
					opts.mapFrom("address");
				})
				.forMember("city", function (opts) {
					opts.mapFrom("city");
				})
				.forMember("county", function (opts) {
					opts.mapFrom("county");
				})
				.forMember("state", function (opts) {
					opts.mapFrom("state");
				})
				.forMember("zip", function (opts) {
					opts.mapFrom("zip");
				})
				.forMember("phone1", function (opts) {
					opts.mapFrom("phone1");
				})
				.forMember("phone2", function (opts) {
					opts.mapFrom("phone2");
				})
				.forMember("email", function (opts) {
					opts.mapFrom("email");
				})
				.forMember("web", function (opts) {
					opts.mapFrom("web");
				})
				.forMember("password", function (opts) {
					opts.mapFrom("password");
				})
				.forMember("salt", function (opts) {
					opts.mapFrom("salt");
				})
				.forMember("lastOnlineAt", function (opts) {
					opts.mapFrom("last_online_at");
				})
				.forMember("isActive", function (opts) {
					opts.mapFrom("is_active");
				})
				.forMember("isOnline", function (opts) {
					opts.mapFrom("is_online");
				});

			return automapper.map("get", "user", sourceObject);
		case "friend-request":
			automapper
				.createMap("friend-request", "user")
				.ignoreAllNonExisting()
				.forMember("userId", function (opts) {
					opts.mapFrom("_id");
				})
				.forMember("avatarUrl", function (opts) {
					opts.mapFrom("avatar");
				})
				.forMember("displayName", function (opts) {
					return `${opts.sourceObject.last_name} ${opts.sourceObject.first_name}`;
				})
				.forMember("isSuccess", function (opts) {
					opts.mapFrom("is_success");
				})
				.forMember("isDeleted", function (opts) {
					opts.mapFrom("is_deleted");
				});

			return automapper.map("friend-request", "user", sourceObject);
		case "friend":
			automapper
				.createMap("friend", "user")
				.ignoreAllNonExisting()
				.forMember("userId", function (opts) {
					opts.mapFrom("_id");
				})
				.forMember("avatarUrl", function (opts) {
					opts.mapFrom("avatar");
				})
				.forMember("displayName", function (opts) {
					return `${opts.sourceObject.last_name} ${opts.sourceObject.first_name}`;
				});

			return automapper.map("friend", "user", sourceObject);

		default:
			return null;
	}
};

module.exports = autoMapper;
