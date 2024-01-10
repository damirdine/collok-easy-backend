export default {
  development: {
    username: "collokeasy",
    password: "password",
    database: "collokeasy",
    models: "./models/*.js",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "collokeasy",
    password: "password",
    database: "collokeasy",
    models: "./models/*.js",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false,
  },
  production: {
    use_env_variable: "PROD_DB_URL",
    dialect: "mysql",
    // username: process.env.PROD_DB_USERNAME,
    // password: process.env.PROD_DB_PASSWORD,
    // database: process.env.PROD_DB_NAME,
    // host: process.env.PROD_DB_HOSTNAME,
    // port: process.env.PROD_DB_PORT,
  },
};
