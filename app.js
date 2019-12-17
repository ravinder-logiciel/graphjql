const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schemaa');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

var mongoDB = 'mongodb+srv://ravinder_ls:owner123@cluster0-8zmbp.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open',() => {
    console.log('connected to database');
})
mongoose.connection.once('error',() => {
    console.log('connected to database failed');
})

app.use(cors());

// mongodb+srv://ravinder_ls:<password>@cluster0-8zmbp.mongodb.net/test?retryWrites=true&w=majority
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(5000);