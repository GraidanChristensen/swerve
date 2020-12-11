UPDATE products
SET amount_medium = $2
WHERE product_id = $1
RETURNING*;