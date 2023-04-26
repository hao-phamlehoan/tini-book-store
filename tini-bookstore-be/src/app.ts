import express from "express";
import logger from "morgan";
import * as path from "path";
import helmet from 'helmet';
import cors from 'cors';
import * as MySQLConnector from './api/mysql.connector';


import { errorHandler, errorNotFoundHandler } from "./middlewares/errorHandler";

// Routes
import bill from "./routes/bill.router"
import product from "./routes/product.router"

// Create Express server
export const app = express();

// Express configuration
// adding set of security middlewares
app.use(helmet());
// enable all CORS request
app.use(cors());


app.set("port", process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", product);
app.use("/bill", bill);

app.use(errorNotFoundHandler);
app.use(errorHandler);