var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('*', indexRouter);
// app.use('/users', usersRouter);

// var { graphqlHTTP } = require('express-graphql');
// var { buildSchema } = require('graphql');
 
// // Construct a schema, using GraphQL schema language
// // Sets routes and return types
// var schema = buildSchema(`
//   type Query {
//     quoteOfTheDay: String
//     random: Float!
//     rollDice(numDice: Int!, numSides: Int): [Int]
//   }
// `);
 
// // The root provides a resolver function for each API endpoint
// var root = {
//   quoteOfTheDay: () => {
//     return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
//   },
//   random: () => {
//     return Math.random();
//   },
//   rollDice: ({numDice, numSides}) => {
//     var output = [];
//     for (var i = 0; i < numDice; i++) {
//       output.push(1 + Math.floor(Math.random() * (numSides || 6)));
//     }
//     return output;
//   }
// };
 
// var app = express();
// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true,
// }));

module.exports = app;
