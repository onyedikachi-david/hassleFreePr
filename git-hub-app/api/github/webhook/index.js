const {createMiddleWare, createProbot} = require('probot');

const app = require('../../../index');
const probot = createProbot();

module.exports = createMiddleWare(app, {probot, webhooksPath: '/api/github/webhook'})