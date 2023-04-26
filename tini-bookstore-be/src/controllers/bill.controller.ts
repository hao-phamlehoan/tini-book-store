import { Request, RequestHandler, Response } from "express";
import Bill from "../models/bill";
import * as BillService from "../services/bill.service";
import { Include } from "../models/bill"


export const postBill: RequestHandler = async (req: Request, res: Response) => {
  const bill = Bill.newBill(
    req.body["b_time"],
    req.body["city"],
    req.body["district"],
    req.body["streetNum"],
    req.body["b_status"],
    req.body["phone"],
    req.body["email"],
    req.body["customer_name"],
    req.body["payment_method"]
  );

  try {
    await BillService.postBill(bill);
    req.body["include"].map(async (el: any) => {
      let item = new Include(bill.b_id, el.p_id, el.amount);
      await BillService.addCart(item);
    });

    res.sendStatus(201);
  } catch (error) {
    console.error(
      "[bill.controller][postBill][Error] ",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    res.status(500).json({
      message: "There was an error when adding bill",
    });
  }
};


export const getBill: RequestHandler = async (req: Request, res: Response) => {
  try {
    const bills = await (await BillService.getBill()).rows;
    res.status(200).json(
      bills
    );
  }  catch (error) {
    console.error('[product.controller][getBill][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when fetching bill'
    });
  }
}

export const updateState: RequestHandler = async (req: Request, res: Response) => {
  const id = req.body['b_id']
  const status = req.body['b_status']

  try {
    if (! (['Waiting', 'Shipping','Done','Cancelled'].includes(status)) )
      res.sendStatus(403);
    else {
      await BillService.updateState(id, status);
      res.sendStatus(204);
    }

  }  catch (error) {
    console.error('[product.controller][updateState][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
    res.status(500).json({
      message: 'There was an error when fetching bill'
    });
  }
}