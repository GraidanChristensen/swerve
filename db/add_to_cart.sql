INSERT INTO cart_reference(product_id, cart_id)
VALUES($1, $2)
RETURNING *;