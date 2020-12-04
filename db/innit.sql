-- CREATE TABLE products(product_id SERIAL PRIMARY KEY, title VARCHAR(30), description VARCHAR(200), image VARCHAR(200), back_image VARCHAR(200), price DECIMAL(10,2), amount_small INT, amount_medium INT, amount_large INT, amount_xlarge INT, amount_xxlarge INT);

-- INSERT INTO products(title, description, image, price, amount_small, amount_medium, amount_large, back_image)
-- VALUES('White T Shirt', 'High quality whit t shirt', 'https://media.gq.com/photos/5e839e82c0eb3f0008e4270b/master/w_2000,h_1333,c_limit/Sunspel-organic-Riviera-T-shirt.jpg', 20.00, 5, 5, 5, 'https://cdn.shopify.com/s/files/1/2029/4253/products/OMO_OG_LOGO_Tee_Back_White_530x@2x.jpg?v=1522180082');

--INSERT INTO products (title, description, image, price, amount_small)
-- VALUES('Black Beanie', 'High quality beanie', 'https://images-na.ssl-images-amazon.com/images/I/61Pr5UVOkwL._AC_UX466_.jpg', 20.00, 20);



-- CREATE TABLE cart (cart_id SERIAL PRIMARY KEY, total_price DECIMAL(10,2), total_quantity INT);

--CREATE TABLE cart_reference(product_id INT REFERENCES products(product_id), cart_id INT REFERENCES cart(cart_id), size VARCHAR(20));
