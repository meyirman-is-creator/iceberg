// src/infrastructure/graphql/schema.ts

import { buildSchema } from "graphql";
import { userResolver } from "./resolvers/user.resolver";
import { bookResolver } from "./resolvers/book.resolver";

export const schema = buildSchema(`
  type User {
    id: Int
    name: String
    email: String
  }

  type Book {
    id: Int
    title: String
    description: String
    authorId: Int
  }

  type Query {
    me(userId: Int!): User
    getBooksList: [Book]
    getBookById(id: Int!): Book
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): User
    login(email: String!, password: String!): String

    createBook(title: String!, description: String, authorId: Int!): Book
    updateBook(id: Int!, title: String, description: String, authorId: Int): Book
  }
`);

export const rootResolvers = {
  ...userResolver,
  ...bookResolver,
};
