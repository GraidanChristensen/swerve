SELECT SUM(p.price)
FROM cart_reference c
JOIN products p ON c.product_id = p.product_id
WHERE c.cart_id = $1;