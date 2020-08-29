require("dotenv").config();

const cookieParser = require("cookie-parser"),
	connection = require("./connection/connection"),
	cors = require("cors"),
	createError = require("http-errors"),
	express = require("express"),
	handleUnAuthorize = require("./helpers/jwt").handleUnAuthorize,
	jwt = require("./helpers/jwt").default,
	logger = require("morgan"),
	path = require("path"),
	routes = require("./controllers/main-route"),
	swaggerDocument = require("./swagger.ts"),
	swaggerJsDoc = require("swagger-jsdoc"),
	swaggerUi = require("swagger-ui-express");

global.responseCode = require("./constants/response-code");
global.manipulate = require("./helpers/function-base").manipulate;

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(cors());
app.use(jwt());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(handleUnAuthorize);

const swaggerOption = {
	swaggerDefinition: swaggerDocument,
	apis: ["./controllers/*.js"],
};

const customOption = {
	customCss:
		"#swagger-ui .topbar {background-image: linear-gradient(to right top, #5ec282, #54be84, #4bba86, #41b588, #37b189, #2ead8b, #25a98c, #1ca58d, #12a08e, #099c8e, #02978e, #00928d);} .swagger-ui * {font-family: calibri !important;}",
	swaggerOptions: {
		docExpansion: "none",
	},
};

const swaggerDoc = swaggerJsDoc(swaggerOption);
app.use("/", routes);

app.use("/readme", swaggerUi.serve, swaggerUi.setup(swaggerDoc, customOption));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
