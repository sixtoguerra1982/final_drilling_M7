const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const { StatusCodes } = require('http-status-codes');

// IMPORTAR CONTROLADORES
const { createUser, findAll, findUserById } = require('./app/controllers/user.controller');

// MIDDELWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

//  http://localhost:3000/user?first_name=Sixto&last_name=Guerra&email=sixto.guerra1982@gmail.com
app.post('/user/', async (req, res) => {
  try {
    if (req.query.first_name && req.query.last_name && req.query.email) {
      const user = await createUser(req.query);
      res.status(StatusCodes.CREATED).json({
        message: `usuario ${user.email} fue creado con éxito`,
        user
      });
    } else {
      res.status(StatusCodes.BAD_REQUEST)
        .json({ message: `Query Params de Entrada, Insufucientes (first_name, last_name, email )` });
    }
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
});

// http://localhost:3000/users/
app.get('/users/', async (req, res) => {
  try {
    const users = await findAll();
    res.json(users)
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
})

app.get('/users/:id', async (req, res) => {
  try {
    const id = req.params.id
    const user = await findUserById(id);
    res.status((user.message) ? StatusCodes.NOT_FOUND : StatusCodes.OK ).json(user);
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
})


app.all('*', (req, res) => {
  res.status(StatusCodes.NOT_FOUND).send("Ruta desconocida.");
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});