INSERT INTO cart_reference(product_id, cart_id, size)
VALUES($1, $2, $3)
RETURNING *;