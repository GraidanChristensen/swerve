INSERT INTO products (title, description, image, back_image, price, amount_small, amount_medium, amount_large, amount_xlarge, amount_xxlarge, amount_onesize)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
RETURNING *;