export const BillQueries = {
  addBill: `INSERT INTO Bill (b_id, B_time, City, District, StreetNum, B_Status, Phone, Email, Customer_name, Payment_method) 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
  addEach: `INSERT INTO Included(Bill_ID,Product_UUID, Quantity) VALUES ($1, $2, $3)`,
  getBill: `SELECT * FROM BILL`,
  updateBill: `UPDATE BILL SET b_status = $1 WHERE b_id = $2`
}