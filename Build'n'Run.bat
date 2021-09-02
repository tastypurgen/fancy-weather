echo build started
call npm run build
cd ../build
dir
start node server.js