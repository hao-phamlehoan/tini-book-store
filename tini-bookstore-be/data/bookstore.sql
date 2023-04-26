
create table Product_type
(
    Code                VARCHAR(300) NOT NULL,
    P_Description       VARCHAR(300),
    constraint PK_Product_type Primary key (Code, P_Description)
);

create table Product
(
    UUID                CHAR(6) NOT NULL,
    P_Name              VARCHAR(300) NOT NULL,
    Price               DECIMAL(10,0) NOT NULL,
    Discount            DECIMAL(2,2) NOT NULL,
    Amount              DECIMAL(10,0) NOT NULL,
    Cover               VARCHAR(300), 
    Product_type_code   VARCHAR(300) NOT NULL,
    constraint PK_Product primary key (UUID)
);

create table Book
(
    Book_UUID           CHAR(6) NOT NULL,
    IBSN                CHAR(7),
    Publishing_year     INT,
    Publisher           VARCHAR(300),
    Authors             VARCHAR(300),
    constraint PK_BOOK primary key (Book_UUID)
);

create table Stationery 
(
    Stationery_UUID     CHAR(6) NOT NULL,
    Barcode             VARCHAR(300),
    Distributor                 VARCHAR(300),
    constraint PK_Stationery    primary key (Stationery_UUID)
);

create table Included
(
    Product_UUID        CHAR(6) NOT NULL,
    Bill_ID             VARCHAR(300) NOT NULL,
    Quantity            DECIMAL(10,0) NOT NULL,
    constraint PK_Included Primary key (Product_UUID, Bill_ID)
);

create table Bill
(
    B_ID                VARCHAR(300) NOT NULL,
    B_time            VARCHAR(300) NOT NULL,
    City                VARCHAR(300) NOT NULL,
    District            VARCHAR(300) NOT NULL,
    StreetNum           VARCHAR(300) NOT NULL,
    B_Status              VARCHAR(300) NOT NULL,
    Phone               CHAR(11) NOT NULL,
    Email               VARCHAR(300) NOT NULL,
    Customer_name       VARCHAR(300) NOT NULL,
    Payment_Method      VARCHAR(300) NOT NULL,
    constraint PK_Customer primary key (B_ID)
);
