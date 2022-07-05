import { Pool } from "pg";
import config from "./config";

const database = new Pool({
  host: config.HOST,
  user: config.USER,
  password: config.PASS,
  database: config.DB,
});

export default database;
