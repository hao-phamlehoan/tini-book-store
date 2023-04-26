import { Pool } from 'pg';
import * as dotenv from "dotenv";
dotenv.config();

const pool = new Pool({ connectionString: process.env.CONNECTION_STRING });

pool.on('connect', () => {
  console.log('Success!');
});

function query(text: string, params: any[]) {
  return pool.query(text, params);
}

export default query;