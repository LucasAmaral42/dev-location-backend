const { Router } = require('express');
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')

const routes = Router();

routes.get('/devs', DevController.index)
routes.post('/devs', DevController.store);

routes.get('/search', SearchController.index)

module.exports = routes;

// Métodos HTTP: get, post, put, delete

// Tipos de parâmetros:

//Query Params: request.query (Filtros, ordenação , ...) 
//Route Params: request.params (identificar um recurso na alteração, remoção)
// Body