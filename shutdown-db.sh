docker rm -f centrio_db
docker rmi -f centrio_db_img
docker volume rm $(docker volume ls -qf dangling=true)
