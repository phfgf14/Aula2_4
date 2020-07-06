/* Imports */
import express from 'express';
import mongoose from 'mongoose';

import { studentRouter } from './routes/studentRouter.js';

require('dotenv').config();

/* Conexão com o MongoDB */
// url para conexao base local
// const url = 'mongodb://localhost/grades';

// url para conexao base cloud (Mongo DB Atlas)
const url = `mongodb+srv://${process.env.USERDB}:${process.env.PWDDB}@cluster0-a4kgi.mongodb.net/grades?retryWrites=true&w=majority`;

// mongoose
//   .connect(url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(console.log('Conectado ao MongoDB local'))
//   .catch((err) => console.log('Erro ao conectar no MongoDB local ' + err));

(async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log('Erro ao conectar no MongoDB ' + error);
  }
})();

const app = express();
app.use(express.json());
app.use(studentRouter);

app.listen(process.env.PORT, () => console.log('API iniciada'));
