const automapper = require("automapper-ts");

const autoMapper = (sourceObject, targetName, fromName) => {
  const _target = targetName.toLowerCase();

  switch (_target) {
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

    default:
      return null;
  }
};

module.exports = autoMapper;
