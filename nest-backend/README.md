# XHAKC.DEV BACKEND

To run postgres database in docker

TO START DATABASE CONTAINER:
```shell script
docker run --name xhack-postgres -e POSTGRES_PASSWORD=qDunHbjkQeht2JI41rnns1yHxW5ilONqvVpGKawj -d -p 5432:5432 postgres:10
```

TO REMOVE DATABASE CONTAINER:
```shell script
docker rm -f xhack-postgres
```

TO BACKUP DATABASE:
```shell script
PGPASSWORD="qDunHbjkQeht2JI41rnns1yHxW5ilONqvVpGKawj" pg_dump -h localhost -p 5432 -U postgres postgres > dump.sql
```

TO RESTORE DATABASE BACKUP:
```shell script
PGPASSWORD="qDunHbjkQeht2JI41rnns1yHxW5ilONqvVpGKawj" psql -h localhost -p 5432 -U postgres -d postgres -f dump.sql
```

TO START MINIO SERVER:
```
docker run -p 9000:9000 --name minio1 -v /mnt/data:/data -e "MINIO_ROOT_USER=AKIAIOSFODNN7EXAMPLE" -e "MINIO_ROOT_PASSWORD=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY" minio/minio server /data
```



To run app in development mode
```shell script
npm install
npm run start:dev
```

To run app with pm2

Do not forget to add configuration in .env file!
```shell script
pm2 start app-pm2.json
```



To run documentation generator
```shell script
npm run docs
```

### TODO checklist
1. All controllers methods should have ValidationPipe
2. All controllers methods should have AuthGuard
3. All dto s should have validations

