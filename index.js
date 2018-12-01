const { ApolloServer, gql } = require('apollo-server-express');
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const parseurl = require('parseurl');
const cors = require('cors');

const { merge } = require('lodash');
const server = new ApolloServer({ 
  typeDefs: [
    require('./app_api/app_schema'),
    require('./open_referral_api/open_referral_schema'),
  ],
  resolvers: merge(
    require('./app_api/app_resolvers'),
    require('./open_referral_api/open_referral_resolvers'),
  ),
  context: ({ req }) => ({
    session: req.session,
  })
});

const app = express().use(cors());
server.applyMiddleware({ app });

module.exports = app;
