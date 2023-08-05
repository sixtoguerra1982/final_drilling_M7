const express = require('express');
const app = express();
const port = 3000;
const { StatusCodes } = require('http-status-codes');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.all('*', (req, res) => {
  res.status(StatusCodes.NOT_FOUND).send("Ruta desconocida.");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});