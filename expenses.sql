CREATE TABLE IF NOT EXISTS expenses (
expense_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
shop_name varchar(60) NOT NULL,
amount DECIMAL(10,2) NOT NULL,
category_id INT NOT NULL,
expense_date DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY(category_id) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS categories(
    id INT NOT NULL PRIMARY KEY,
    category_type VARCHAR(20)
);

INSERT INTO expenses (shop_name, amount, category_id) VALUES
("Spotify", 17.89, 3),
("Tokmanni", 2.89, 1),
("Prisma", 11.48, 1),
("Prisma", 5.02,1),
("Wolt", 32.18, 2),
("Alepa", 3.00, 1),
("K-market", 69.02, 2),
("Pancho Villa", 23.99, 2),
("Apple Store", 229, 3),
("Ristorante Momento", 14.22, 2);
/*will reset auto increment and delete all data*/
TRUNCATE TABLE expenses;

INSERT INTO categories (id, category_type) VALUES
(1, "shop"),
(2, "food"),
(3, "other");
insert into expenses set shop_name="Rituals", amount=10.90, category_id=3, expense_date="2022-2-13";


/*query testings*/
update expenses set shop_name ="Sale" where expense_id = 12;

select expense_id ,shop_name, category_type, amount, expense_date
from expenses inner join categories on category_id = categories.id;
select * FROM expenses WHERE shop_name LIKE 'Apple Store' AND category_id LIKE 3 AND amount LIKE 24.91;
delete FROM expenses WHERE shop_name LIKE 'Apple Store' AND category_id LIKE 2;
/*
K-market,food,69.02,2022-12-27 16:47:23
Prisma,shop,11.48,2022-12-27 17:04:17
Spotify,other,17.89,2022-12-27 16:47:23
Tokmanni,shop,2.89,2022-12-27 16:47:23*/

select expense_id, shop_name, count(shop_name), amount, count(amount)
from expenses inner join categories on category_id =categories.id group by shop_name;