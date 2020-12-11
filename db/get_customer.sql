SELECT * 
FROM customers c
JOIN cart ON cart.customer_id = c.customer_id
WHERE c.cart_id = $1;