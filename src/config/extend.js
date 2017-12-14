const view = require('think-view');
const model = require('think-model');
const cache = require('think-cache');
const session = require('think-session');
const mongo = require('think-mongo');
const mongoose = require('think-mongoose');

module.exports = [
  view, // make application support view
  model(think.app),
  mongo(think.app),
  mongoose(think.app), // 让框架支持模型的功能
  cache,
  session
];
