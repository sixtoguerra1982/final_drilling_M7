const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const { StatusCodes } = require('http-status-codes');

// IMPORTAR CONTROLADORES
const { createUser, findAll, findUserById, updateUserById, deleteUserById} = require('./app/controllers/user.controller');

// MIDDELEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//  http://localhost:3000
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
    console.log(error);
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

// http://localhost:3000/user/:id
app.get('/user/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await findUserById(id);
    res.status((user.message) ? StatusCodes.NOT_FOUND : StatusCodes.OK ).json(user);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
})

// http://localhost:3000/user/:id
app.put('/user/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (req.query.first_name || req.query.last_name || req.query.email){
      const user = {firstName: req.query.first_name, 
                    lastName: req.query.last_name, 
                    email: req.query.email};
      // Eliminar llaves con valores undefined
      for (let key in user) {
        if (user.hasOwnProperty(key) && user[key] === undefined) {
            delete user[key];
        }
      }
      const userUpdate = await updateUserById(id, user);
      if (userUpdate.message) {
        res.status(StatusCodes.NOT_FOUND).json(userUpdate);
      } else {
        let obj
        if (userUpdate[0] == 1){
            obj = { message: `Usuario con id ${id}, efectivamente actualizado`, data: user};
        } else {
            obj = { message: `Usuario con id ${id}. No fue actualizado`};
        }
        res.status((obj['data']) ? StatusCodes.CREATED : StatusCodes.BAD_REQUEST).json(obj);
      }
    } else {
      res.status(StatusCodes.BAD_REQUEST)
      .json({ message: `Query Params de Entrada, Insufucientes (first_name, last_name, email)` });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
})

// http://localhost:3000/user/:id
app.delete('/user/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const userDelete = await deleteUserById(id);
      if (userDelete.message) {
        res.status(StatusCodes.NOT_FOUND).json(userDelete);
      } else {
        console.log(userDelete)
        let obj
        if (userDelete[0] == 1){
            obj = { message: `Usuario con id ${id}, efectivamente Eliminado`, data: userDelete[1]};
        } else {
            obj = { message: `Usuario con id ${id}. No fue Eliminado`};
        }
        res.status((obj['data']) ? StatusCodes.OK : StatusCodes.BAD_REQUEST).json(obj);
      }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
})

app.all('*', (req, res) => {
  res.status(StatusCodes.NOT_FOUND).send("Ruta desconocida.");
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});