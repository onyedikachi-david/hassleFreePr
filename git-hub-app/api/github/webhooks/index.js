const {createMiddleWare, createProbot} = require('probot');

const app = require('../../../app');
const probot = createProbot();

module.exports = createMiddleWare(app, {probot, webhooksPath: '/api/github/webhooks'})