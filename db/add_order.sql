INSERT INTO orders(cart_id, customer_id, fulfilled)
VALUES($1, $2, false)
RETURNING *;