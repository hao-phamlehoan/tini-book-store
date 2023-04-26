
export type Product = {
  uuid: string,
  name: string,
  price: number,
  discount: number,
  amount: number,
  cover: string,
  type_des: string
}

export type Book = Product & {
  isbn: string,
  pubishingYear: number,
  plubisher: string
  authors: string[]
}

export type Stationery = Product & {
  barcode: string,
  distributor: string
}

