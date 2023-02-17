import { pool, redisClient } from "./dbConnectors";
import initialDbContainer from "./initialDbContainer";

const generateDbBase = async () => {
  await initialDbContainer();
  await redisClient.connect();
  const con = await pool.getConnection();
  console.log(" Generating db base...");
  console.log(" creating booker database");
  await con.query(`CREATE DATABASE booker`);
  console.log(" creating users table");
  await con.query(
    `CREATE TABLE booker.users 
    (email varchar(300) not null UNIQUE ,
    password char(64) not null ,
    profileUrl varchar(200) not null default('/prof/default') ,
    userId int not null AUTO_INCREMENT primary key , 
    orders varchar(2000) not null default('[]'),
    addresses varchar(2000) not null default('[]'),
    cart varchar(2000) not null default('[]')
    );`
  );

  console.log(" creating addresses table");
  await con.query(
    `CREATE TABLE booker.addresses 
    (receiverName varchar(200) not null,
    title varchar(300) not null UNIQUE ,
    addressId int not null AUTO_INCREMENT primary key ,
    country varchar(100) not null ,
    street varchar(300) not null ,
    state varchar(100) not null , 
    zipCode varchar(100) not null ,
    tel varchar(200) not null );`
  );
  console.log(" creating books table");

  await con.query(
    `CREATE TABLE booker.books 
    (bookId int not null AUTO_INCREMENT primary key , 
      name varchar(100) not null , 
      author varchar(300) not null , 
      image varchar(500) not null , 
      price int not null , 
      category varchar(400) not null , 
      description varchar(500) not null);`
  );
  console.log(" creating orders table");
  await con.query(
    `CREATE TABLE booker.orders 
    (orderId int not null AUTO_INCREMENT primary key , 
      date varchar(100) not null , 
      state varchar(100) not null default('step1'), 
      priceSummary varchar(1000) not null default('{"shipping": "","subTotal": "","tax": "","total": ""}') , 
      address varchar(1000) not null default('{"title": "","receiverName": "","state": "","city": "","street": "","tel": "","zipCode": "","country": ""}') , 
      books varchar(1000) not null default("[]") );`
  );

  console.log(" creating introducers table");
  await con.query(
    `CREATE TABLE booker.introducers 
    (introducerId int not null AUTO_INCREMENT primary key , 
      name varchar(100) not null , 
      books varchar(1000) not null default("[]"));`
  );

  console.log("DB SCHEME IS READY...");
  await con.end();
  await redisClient.quit();
  process.exit(200);
};

export default generateDbBase;
