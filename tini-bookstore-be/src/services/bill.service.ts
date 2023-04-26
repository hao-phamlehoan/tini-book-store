import query from "../api/mysql.connector";
import Bill, { Include } from "../models/bill";
import { BillQueries } from "../models/bill.queries";


export const getBill = async () => {
  return await query(BillQueries.getBill, []);
}

export const postBill = async (bill: Bill) => {
  console.log([bill.b_id, bill.B_time, bill.City, bill.District, bill.StreetNum, bill.B_Status, bill.Phone, bill.Email, bill.Customer_name, bill.Payment_method])
  await query(BillQueries.addBill, [bill.b_id, bill.B_time, bill.City, bill.District, bill.StreetNum, bill.B_Status, bill.Phone, bill.Email, bill.Customer_name, bill.Payment_method]);
}

export const addCart = async (item: Include) => {
  await query(BillQueries.addEach, [item.b_id, item.p_id, item.amount]);
}

export const updateState = async (id: string, item: string) => {
  await query(BillQueries.updateBill, [item, id]);
}