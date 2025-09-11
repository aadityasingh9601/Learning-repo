# We're basically writing a script here to run inside our shell, that'll bring all of our services up, run the tests and
# bring them down again.

docker-compose up -d

# We're basically running a file that checks if all the services that we intend to run using the docker compose command
# are up or not, once all of them are up successfully, only then proceed ahead.
# The file wait-for-it.sh is a common file you'll come across in many codebases, it's basically handling the logic to
# wait for all the services to be up before proceeding ahead.

echo '🟡 - Waiting for database to be ready...'
./scripts/wait-for-it.sh "postgresql://postgres:Aadityapgsqlpasskey@localhost:5432/postgres" -- echo '🟢 - Database is ready!'

npx prisma migrate dev --name "init"
npm run test
docker-compose down