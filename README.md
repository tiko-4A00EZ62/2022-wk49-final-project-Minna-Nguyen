# 4A00EZ62 Backend-kehitys

## Backend Development - Final Project

### About this project

Sometimes we can't see where and how all of our money is going. In this project I'm creating a simple app where the user can see how they have spent their money and track their personal expenses.

## Tech and other frameworks

- Swagger for RESTful API documentation
- Render for service provider
- Express for a web framework for Node.js

## Backend server address and implemented endpoints

I use this free service provider Render

```
GET     /api/expenses                        get ALL the expenses
GET     /api/expenses/:id                    get expense by id
GET     /api/expenses/month/:month           get expense by month
GET     /api/expenses/category/:type         get expense by expense category type
GET     /api/expense/expense/totalsum        get total expense sum
GET     /api/expense/expense/lt10/:amount    get amounts that are less than 10
GET     /api/expense/expense/gt10/:amount    get amounts that are greater than 10
DELETE  /api/expenses/:id                    delete expense by id (so one item from the list)
POST    /---                                 add new expense
PUT     /api/expense/:id                     update certain expense using id to find it
```

### How to use this project (locally)

##### Running the application

Install `npm install mysql`
Install the express node module `npm install express`.
To make it easier to code this project uses 'nodemon' gloablly. To install it `npm install -g nodemon`

For some Mac users `npm install -g` doesn't do anything so install it with `npm install nodemon --save-dev` And to run it `npx nodemon index.js`

To run the index.js with `nodemon index.js` Nodemon will restart the application everytime new changes are done.

Create a `.env` file to store conneciton information. Make sure not to let anybody see the credentials. You need to install 'dotenv' to the read the `.env` file.
`npm install dotenv --save`

### Creating default database

Creating table "expenses and categories"

```
CREATE TABLE IF NOT EXISTS expenses (
expense_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
shop_name varchar(60) NOT NULL,
amount DECIMAL(10,2) NOT NULL,
category_id INT NOT NULL,
date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY(category_id) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS categories(
    id INT NOT NULL PRIMARY KEY,
    category_type VARCHAR(20)
);
```

Inserting some data values into the tables

```
INSERT INTO expenses (shop_name, amount, category_id) VALUES
("Spotify", 17.89, 3),
("Tokmanni", 2.89, 1),
("Prisma", 11.48, 1),
("Prisma", 5.02,1),
("Wolt", 32.18, 2),
("Alepa", 3.00, 1),
("K-market", 69.02, 2);


INSERT INTO categories (id, category_type) VALUES
(1, "shop"),
(2, "food"),
(3, "other");
```

## Project self evalutation
