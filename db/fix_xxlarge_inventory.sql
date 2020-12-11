UPDATE products
SET amount_xxlarge = $2
WHERE product_id = $1
RETURNING*;