const knex = require('knex');
const cfg = require('../../knexfile');

const connection = knex(cfg.development);

module.exports = connection;