export default () => ({
  port: parseInt(process.env.PORT, 10) ?? 5000,
  database: {
    host: process.env.DATABASE_HOST ?? '212.113.117.104',
    port: parseInt(process.env.DATABASE_PORT, 10) ?? 5432,
    username: process.env.DATABASE_USERNAME ?? 'fp_db_admin',
    password:
      process.env.DATABASE_PASSWORD ??
      'CoViPXuY4xKTGfijdmsVNMnGUkTUqXxAL26wN8cYPBFZnwGPJDNJWJpGtELY4h9yGp6Nk9wszY6ae6PEZE8J9dZa2Yuu4AApomEJ',
    database: process.env.DATABASE_NAME ?? 'fp_db',
    name_prefix: process.env.DATABASE_PREFIX,
  },
  password_salt:
    process.env.PASSWORD_SALT ??
    '932f3c1b56257ce8539ac269d7aab42550dacf8818d075f0bdf1990562aae3ef',
  jwt: {
    secret:
      process.env.JWT_SECRET ??
      '932f3c1b56257ce8539ac269d7aab42550dacf8818d075f0bdf1990562aae3ef932f3c1b56257ce8539ac269d7aab42550dacf8818d075f0bdf1990562aae3ef',
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
