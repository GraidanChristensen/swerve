UPDATE products
SET amount_small = $2
WHERE product_id = $1
RETURNING*;