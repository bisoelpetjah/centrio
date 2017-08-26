echo "docker compose up"
docker-compose up -d

echo "seed database"
sleep 1
echo "."
sleep 1
echo "."
sleep 1
echo "."
sleep 1
echo "."
sleep 1
echo "."
docker exec -it centrio_database mongoimport --db admin -c user --file ./seed/user.rows.json
docker exec -it centrio_database mongoimport --db admin -c transaction --file ./seed/transaction.rows.json
docker exec -it centrio_database mongoimport --db admin -c transfer --file ./seed/transfer.rows.json
docker exec -it centrio_database mongoimport --db admin -c item --file ./seed/item.rows.json