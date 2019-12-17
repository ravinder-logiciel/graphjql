const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLID, GraphQLList, GraphQLNonNull } = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields() {
        return {
            id: {type: GraphQLID},
            name: {type: GraphQLString},
            genre: {type: GraphQLString},
            authorId: {type: GraphQLString}
        }
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        books: {
            type: new GraphQLList(BookType),
            args: {},
            resolve(parent, args) {
                return Book.find({});
            }
        }
    }
});

const Mutations = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLString },
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });

                return book.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations
});