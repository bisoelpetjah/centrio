docker build ./database/. -t centrio_db_img
docker run --name centrio_db -d -p 27017:27017 centrio_db_img

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
docker exec -it centrio_db mongoimport --db admin -c user --file ./seed/user.rows.json
docker exec -it centrio_db mongoimport --db admin -c transaction --file ./seed/transaction.rows.json
docker exec -it centrio_db mongoimport --db admin -c transfer --file ./seed/transfer.rows.json
docker exec -it centrio_db mongoimport --db admin -c item --file ./seed/item.rows.json