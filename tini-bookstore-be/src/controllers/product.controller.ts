import { NextFunction, Request, RequestHandler, Response } from "express"
import * as ProductService from '../services/product.service';

export const getProduct: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = req.query.q as string || "";
    let products;
    if (query !== "") products = await (await ProductService.getProductByName(query)).rows;
    else products = await (await ProductService.getProduct()).rows;

    res.status(200).json(
      products
    );
  } catch (error) {
    console.error('[product.controller][getProduct][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when fetching product'
    });
  }
}

export const getProductById: RequestHandler = async (req: Request, res: Response) => {
  try {
    const products = await (await ProductService.getProductById(req.params.id)).rows[0];

    res.status(200).json(
      products
    );
  } catch (error) {
    console.error('[product.controller][getProduct][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when fetching product'
    });
  }
}

export const getBook: RequestHandler = async (req: Request, res: Response) => {
  try {
    const query = req.query.id as string || "";
    let books;
    if (query === "") books = await (await ProductService.getBook()).rows;
    else books = await (await ProductService.getBookById(query)).rows[0];

    res.status(200).json(
      books
    );
  } catch (error) {
    console.error('[product.controller][getBook][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when fetching product'
    });
  }
}

export const getStationery: RequestHandler = async (req: Request, res: Response) => {
  try {
    const query = req.query.id as string || "";
    let stationeries;
    if (query === "") stationeries = await (await ProductService.getStationery()).rows;
    else stationeries = await (await ProductService.getStationeryById(query)).rows[0];

    res.status(200).json(
      stationeries
    );
  } catch (error) {
    console.error('[product.controller][getStationery][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when fetching product'
    });
  }
}