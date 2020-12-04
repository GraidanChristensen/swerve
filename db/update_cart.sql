UPDATE cart
SET total_price = $2, total_quantity = $3
WHERE cart_id = $1
RETURNING *;