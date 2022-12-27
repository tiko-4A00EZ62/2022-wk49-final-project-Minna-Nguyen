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
GET    /---            get ALL the expenses
GET    /---            get expense by id
GET    /---            get expense by month
GET    /---            get expense by expense type
DELETE /---            deletes ALL expenses
DELETE /---            deletes expense by id (so one item from the list
POST    /---           update expense
```

### How to use this project (locally)

##### Running the application

Install `npm install mysql`
Install the express node module `npm install express`.
To make it easier to code this project uses 'nodemon' gloablly. To install it `npm install -g nodemon`

For Mac users install it `npm install nodemon --save-dev` And to run it `npx nodemon index.js`

To run the index.js with `nodemon index.js` Nodemon will restart the application everytime new changes are done.

Create a `.env` file to store conneciton information. Make sure not to let anybody see the credentials. You need to install 'dotenv' to the read the `.env` file.
`npm install dotenv --save`

### Creating default database

Creating table "---"

```
CREATE TABLE IF NOT EXIST "---" (
"id" int() NOT NULL AUTO_INCREMENT,
"name" varchar(60) NOT NULL,
"created" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updated" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
PRIMARY KEY ("id")
)
```

Inserting some data values into the table

```
INSERT INTO "---" VALUES(sjsjs)
```

## Project self evalutation
