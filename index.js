const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler')

const app = express();
const port = process.env.PORT||3000;

app.use(express.json());

const whitelist = ['https://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('No permitido'))
    }
  }
}
app.use(cors());

app.get('/', (req, res)=>{
  res.send('Hola mi server en express');
})

app.get('/nueva-ruta', (req, res)=>{
  res.send('Hola soy una nueva ruta');
});

routerApi(app);


app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.get('/home', (req, res)=>{
  res.send('Pagina principal de la app')
})

app.listen(port, () => {
  console.log('Mi port' + port);
});
