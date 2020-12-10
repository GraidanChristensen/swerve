INSERT INTO customers(email, first_name, last_name, address, apartment, city, country, state, postal_code, phone, cart_id)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
RETURNING *