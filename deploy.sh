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
docker exec -it centrio_database mongorestore .