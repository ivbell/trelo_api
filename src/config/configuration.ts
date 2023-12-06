export default () => ({
  port: parseInt(process.env.PORT, 10) ?? 5000,
  database: {
    host: process.env.DATABASE_HOST ?? '212.113.117.104',
    port: parseInt(process.env.DATABASE_PORT, 10) ?? 5432,
    username: process.env.DATABASE_USERNAME ?? 'fp_db_admin',
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME ?? 'fp_db',
    name_prefix: process.env.DATABASE_PREFIX,
  },
  password_salt: process.env.PASSWORD_SALT,
  jwt: {
    secret: process.env.JWT_SECRET,
    expires_in: process.env.JWT_EXPIRE_IN ?? '30d',
  },
  cookie: {
    secret:
      process.env.COOKIE_SECRET ?? '932f3c1b56257ce8539932f3c1b56257ce8539',
  },
  app: {
    client: process.env.APP_CLIENT ?? 'http://localhost:3000',
  },
});
