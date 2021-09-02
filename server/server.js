const express = require('express');

const app = express();
const port = 8787;

app.use(express.static(__dirname));
app.listen(port);
console.log('server started on ', port);
