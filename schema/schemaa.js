const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLID, GraphQLList, GraphQLNonNull } = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = `
    type Book{
        id: ID
        name: String
        genre: String
    }
    type Query {
        books: [Book]
        book(id: ID): Book
    }
    type Mutation {
        addBook(
            name: String!,
            genre: String!
        ):Book
    }
    schema {
        query: Query
        mutation: Mutation
    }
`;

const resolvers = {
    Query: {
        books: (parent, args) => {
            return Book.find({});
        },
        book: (parent, {id}) => {
            return Book.findById(id);
        }
    },

    Book: {
        genre: (parent, args) => {
            return parent.genre + "_modified"
        }
    },

    Mutation: {
        addBook: (parent, args) => {
            let book = new Book(args);
            book.save();
        }
    }
};


module.exports = new makeExecutableSchema({
    typeDefs,
    resolvers
})