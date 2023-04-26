import { Router } from "express";
import * as controller from "../controllers/product.controller";

const product = Router();

product.get("/", controller.getProduct);
product.get("/stationery", controller.getStationery);
product.get("/book", controller.getBook);

export default product;