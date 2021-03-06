const swaggerDocument = {
  swagger: "2.0",
  securityDefinitions: {
    jwt: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
    },
  },
  security: [
    {
      jwt: [],
    },
  ],
  info: {
    version: "1.0.0",
    title: "APIs Document",
    description: "",
    termsOfService: "",
    contact: {
      name: "Nguyen Duong Minh Hieu",
      email: "nguyenduongminhhieu1701@gmail.com",
      url: "",
    },
    license: {
      name: "Apache 2.0",
      url: "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
  },
  servers: [
    {
      url: "http://localhost:9000/readme/index",
      description: "Local server",
    },
  ],
};

module.exports = swaggerDocument;
