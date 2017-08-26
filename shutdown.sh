docker-compose down
docker rmi -f centrio_payment-api centrio_database
docker volume rm $(docker volume ls -qf dangling=true)
