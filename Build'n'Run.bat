echo build started
call npm run build
cd dist
dir
start node server.js
