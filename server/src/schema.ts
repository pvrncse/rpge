import { makeExecutableSchema } from '@graphql-tools/schema'
import { Context } from './context'

const typeDefs = `
type Mutation {
  createUser(data: UserCreateInput!): User
  updateUser(data: UserCreateInput!, id: Int!): User
  deleteUser(id: Int!): User
}

type Query {
  allUsers: [User!]!
}

type User {
  email: String!
  id: Int!
  name: String
  bio: String
}

input UserCreateInput {
  email: String!
  name: String
  bio: String
}
`

const resolvers = {
  Query: {
    allUsers: (_parent, _args, context: Context) => {
      return context.prisma.user.findMany()
    },
  },
  Mutation: {
    createUser: (
      _parent,
      args: { data: UserCreateInput },
      context: Context,
    ) => {

      return context.prisma.user.create({
        data: {
          name: args.data.name,
          email: args.data.email,
          bio: args.data.bio,
        },
      })
    },
    updateUser: (
      _parent,
      args: { data: UserCreateInput, id: number },
      context: Context,
    ) => {

      return context.prisma.user.update({
        where:{
          id: args.id
        },
        data: {
          name: args.data.name,
          email: args.data.email,
          bio: args.data.bio,
        },
      })
    },
    deleteUser: (_parent, args: { id: number }, context: Context) => {
      return context.prisma.user.delete({
        where: { id: args.id },
      })
    },
  }
}


interface UserCreateInput {
  email: string
  name?: string
  bio: string
  id?: number
}

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})
