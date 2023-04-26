

import query from "../api/mysql.connector";
import { Product } from "../models/product"
import { BookQueries, ProductQueries, StationeryQueries } from "../models/product.queries";

export const getProduct = async () => {
  return await query(ProductQueries.getProduct, []);
}

export const getProductById = async (id : string) => {
  return await query(ProductQueries.getProductById, [id]);
}

export const getProductByName = async (name : string) => {
  console.log("here")
  return await query(ProductQueries.getProductByName, [name]);
}

export const getBook = async () => {
  return await query(BookQueries.getBook, []);
}

export const getBookById = async (id : string) => {
  return await query(BookQueries.getBookById, [id]);
}

export const getStationery = async () => {
  return await query(StationeryQueries.getStationery, []);
}

export const getStationeryById = async (id : string) => {
  return await query(StationeryQueries.getStationeryById, [id]);
}