CREATE OR REPLACE PROCEDURE add_Bill
(
    id IN varchar(300), 
    Btime IN varchar(300), 
    Bcity IN varchar(300), 
    Bdistrict IN varchar(300), 
    Bstreetnum IN varchar(300), 
    status IN varchar(300), 
    Bphone IN char(11), 
    Bemail IN varchar(300), 
    Bcustomer_name IN varchar(300), 
    Bpayment_method IN varchar(300)
)
AS $$
BEGIN
    INSERT INTO Bill (b_id, B_time, City, District, StreetNum, B_Status, Phone, Email, 
    Customer_name, Payment_method) 
    VALUES (id, time, Bcity, Bdistrict, Bstreetnum, status, Bphone, Bemail, Bcustomer_name, 
    Bpayment_method);
END; $$ 
LANGUAGE 'plpgsql';

CREATE OR REPLACE PROCEDURE add_Included
(
    Bid IN char(6), 
    Pid IN varchar(300), 
    Pquantity IN numeric(10) 
)
AS $$
BEGIN
    INSERT INTO Included(Bill_ID,Product_UUID, Quantity) VALUES (Bid, Pid, Pquantity);
END; $$ 
LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION get_product()
RETURNS TABLE (
        pt_id                char(6),
        pt_name              varchar(300),
        pt_price             numeric(10, 2),
        pt_discount          numeric(2, 2),
        pt_amount            numeric(10),
        pt_cover             varchar(300),
        pt_product_type_code varchar(300)
) 
AS $$
BEGIN
    RETURN QUERY SELECT * FROM PRODUCT;
END; $$ 
LANGUAGE 'plpgsql';

CREATE OR REPLACE PROCEDURE update_state
(
    bid         varchar(300),
    bstate      varchar(300)
)
AS $$
BEGIN
    UPDATE BILL SET b_status = bstate WHERE b_id = bid;
END; $$ 
LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION get_product_by_id(id IN char(6))
RETURNS TABLE (
        pt_id                char(6),
        pt_name              varchar(300),
        pt_price             numeric(10, 2),
        pt_discount          numeric(2, 2),
        pt_amount            numeric(10),
        pt_cover             varchar(300),
        pt_product_type_code varchar(300)
) 
AS $$
BEGIN
    RETURN QUERY SELECT * FROM PRODUCT WHERE PRODUCT.UUID = id;
END; $$ 
LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION get_product_by_name(name IN varchar(300))
RETURNS TABLE (
        pt_id                char(6),
        pt_name              varchar(300),
        pt_price             numeric(10, 2),
        pt_discount          numeric(2, 2),
        pt_amount            numeric(10),
        pt_cover             varchar(300),
        pt_product_type_code varchar(300)
) 
AS $$
BEGIN
    RETURN QUERY SELECT * FROM PRODUCT WHERE PRODUCT.P_NAME LIKE '%' || name || '%' ;
END; $$ 
LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION get_book()
RETURNS TABLE (
        book_uuid           char(6),
        ibsn                char(7),
        publishing_year     integer,
        publisher           varchar(300),
        authors             varchar(300),
        pt_name              varchar(300),
        pt_price             numeric(10, 2),
        pt_discount          numeric(2, 2),
        pt_amount            numeric(10),
        pt_cover             varchar(300),
        pt_product_type_code varchar(300)
) 
AS $$
BEGIN
    RETURN QUERY SELECT * FROM BOOK 
    INNER JOIN PRODUCT ON BOOK.BOOK_UUID = PRODUCT.UUID;
END; $$ 
LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION get_book_by_id(id IN char(6))
RETURNS TABLE (
        book_uuid           char(6),
        ibsn                char(7),
        publishing_year     integer,
        publisher           varchar(300),
        authors             varchar(300),
        pt_name              varchar(300),
        pt_price             numeric(10, 2),
        pt_discount          numeric(2, 2),
        pt_amount            numeric(10),
        pt_cover             varchar(300),
        pt_product_type_code varchar(300)
) 
AS $$
BEGIN
    RETURN QUERY SELECT * FROM BOOK 
    INNER JOIN PRODUCT ON BOOK.BOOK_UUID = PRODUCT.UUID
    WHERE BOOK.BOOK_UUID = id;
END; $$ 
LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION get_stationery()
RETURNS TABLE (
        stationery_uuid     char(6),
        barcode         varchar(300),
        distributor     varchar(300),
        pt_name              varchar(300),
        pt_price             numeric(10, 2),
        pt_discount          numeric(2, 2),
        pt_amount            numeric(10),
        pt_cover             varchar(300),
        pt_product_type_code varchar(300)
) 
AS $$
BEGIN
    RETURN QUERY SELECT * FROM STATIONERY
INNER JOIN PRODUCT ON STATIONERY.STATIONERY_UUID = PRODUCT.UUID;
END; $$ 
LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION get_stationery_by_id(id IN char(6))
RETURNS TABLE (
        stationery_uuid     char(6),
        barcode         varchar(300),
        distributor     varchar(300),
        pt_name              varchar(300),
        pt_price             numeric(10, 2),
        pt_discount          numeric(2, 2),
        pt_amount            numeric(10),
        pt_cover             varchar(300),
        pt_product_type_code varchar(300)
) 
AS $$
BEGIN
    RETURN QUERY SELECT * FROM STATIONERY
    INNER JOIN PRODUCT ON STATIONERY.STATIONERY_UUID = PRODUCT.UUID
    WHERE STATIONERY.STATIONERY_UUID = id;
END; $$ 
LANGUAGE 'plpgsql'; 