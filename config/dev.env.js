'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"/api"'
  // BASE_API: '"http://www.zzfset.com:9000"'
})
