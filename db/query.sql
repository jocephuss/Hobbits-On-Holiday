SELECT users.username AS user, characters.character
FROM characters
LEFT JOIN users
ON characters.user_id = users.id
ORDER BY users.username;
