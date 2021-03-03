let express = require('express'),
  path = require('path'),
  sequelize = require('sequelize'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  postgres = require('./database/db');
  const createError = require('http-errors');
const prodRoute = require('./routes/produto.routes');

  const sql = new sequelize('postgres://postgres:b26a53c0f6e34bd495fe8c830ae7ddfa@localhost:5432/produtos');
  sql.Promise = global.Promise;
  

const bookRoute = require('./routes/produto.routes')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());

// Static directory path
app.use(express.static(path.join(__dirname, 'dist/static')));


// API root
app.use('/api', prodRoute);

// PORT
const port = process.env.PORT || 8000;

app.listen(port,async  () => {
  try {
    await sql.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  console.log('Listening on port ' + port)
})

// 404 Handler
app.use((req, res, next) => {
  next(createError(404));
});

// Base Route
app.get('/', (req, res) => {
  res.send('invaild endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/static/index.html'));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});