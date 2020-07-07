const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes')

const app = express();



mongoose.connect('mongodb+srv://dev-location-backend:dev-location-backend-db@cluster0.5qliw.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,  
});

app.use(cors())
app.use(express.json());
app.use(routes);



app.listen(process.env.PORT || 3000);