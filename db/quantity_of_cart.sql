SELECT COUNT(product_id)
FROM cart_reference
WHERE cart_id = $1;