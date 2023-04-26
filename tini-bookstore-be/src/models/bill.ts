import { randomUUID } from 'crypto';



export class Include {
  public b_id: string;
  public p_id: string;
  public amount: number;

  constructor(bid: string, pid: string, amount: number) {
    this.b_id = bid;
    this.p_id = pid;
    this.amount = amount;
  }
};


class Bill {
  public b_id: string;
  public B_time: string; 
  public City: string;
  public District: string; 
  public StreetNum: string; 
  public B_Status: string;
  public Phone: string; 
  public Email: string; 
  public Customer_name: string; 
  public Payment_method: string;


  constructor(
    b_id: string, 
    B_time: string, 
    City: string, 
    District: string, 
    StreetNum: string, 
    B_Status: string, 
    Phone: string, 
    Email: string, 
    Customer_name: string, 
    Payment_method: string
  ) {
    this.b_id = b_id;
    this.B_time = B_time;
    this.City = City;
    this.District = District;
    this.StreetNum = StreetNum;
    this.B_Status = B_Status;
    this.Phone = Phone;
    this.Email = Email;
    this.Customer_name = Customer_name;
    this.Payment_method = Payment_method;
  }

  static newBill(
    B_time: string, 
    City: string, 
    District: string, 
    StreetNum: string, 
    B_Status: string, 
    Phone: string, 
    Email: string, 
    Customer_name: string, 
    Payment_method: string
  ): Bill {
    return new Bill(  
      randomUUID(), 
      B_time, 
      City, 
      District, 
      StreetNum, 
      B_Status, 
      Phone, 
      Email, 
      Customer_name, 
      Payment_method
    )};
};

export default Bill;