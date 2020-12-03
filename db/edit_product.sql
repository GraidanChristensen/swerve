UPDATE products
SET title = $2, description = $3, image = $4, back_image = $5, price = $6, amount_small = $7, amount_medium = $8, amount_large = $9, amount_xlarge = $10, amount_xxlarge = $11
WHERE product_id = $1
RETURNING *;