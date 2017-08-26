docker-compose down
docker rmi -f centrio_database
docker volume rm $(docker volume ls -qf dangling=true)
