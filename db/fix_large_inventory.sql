UPDATE products
SET amount_large = $2
WHERE product_id = $1
RETURNING*;