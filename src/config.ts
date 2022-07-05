import dotenv from "dotenv";

dotenv.config();

const {
  PORT,
  PG_HOST,
  PG_DB,
  PG_USER,
  PG_PASS,
  ENV,
  PG_DB_TEST,
  BCRYPT_PASS,
  SALT_ROUND,
  TOKEN_SECRET,
} = process.env;

export default {
  PORT: PORT,
  HOST: PG_HOST,
  DB: ENV === "dev" ? PG_DB : PG_DB_TEST,
  USER: PG_USER,
  PASS: PG_PASS,
  ENV: ENV,
  bcrypt: BCRYPT_PASS,
  salt: SALT_ROUND,
  token: TOKEN_SECRET,
};
