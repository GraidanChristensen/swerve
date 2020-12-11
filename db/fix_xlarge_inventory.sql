UPDATE products
SET amount_xlarge = $2
WHERE product_id = $1
RETURNING*;