UPDATE cart
SET customer_id = $1
WHERE cart_id = $2;