UPDATE products
SET amount_onesize = $2
WHERE product_id = $1
RETURNING*;