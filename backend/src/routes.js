const express = require('express');
const routes = express.Router();
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
/**
    *MÉTODOS HTTP:
        GET: Buscar/listar informações do back-end
        POST: Criar uma informação
        PUT: Alterar uma informação
        DELETE: Deletar uma informação 
 */

/**
    *TIPOS DE PARÂMENTROS 
        Query params: Parâmentros nomeados enviados na rota após o "?", serve para filtros, paginação
        Route params: Parâmentros utilizados para identificar recursos
        Request body: Corpo da requisição, utilizado para criar ou alterar recursos   
 */

routes.post('/session', SessionController.create);

routes.get('/ongs', OngController.listAll);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.listIncidensPerONG);

routes.get('/incidents', IncidentController.listAll);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.destroy);



module.exports = routes;