const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes')
const http = require('http');

const { setupWebsocket } = require('./websocket')


const app = express();
const server = http.Server(app);
setupWebsocket(server);

mongoose.connect('mongodb+srv://dev-location-backend:dev-location@cluster0.5qliw.gcp.mongodb.net/dev-location?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.use(cors())
app.use(express.json());
app.use(routes);


app.listen(process.env.PORT || 3000);