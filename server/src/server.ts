import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import cors from 'cors';
import { schema } from './schema'
import { context } from './context'

const app = express()
app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    context: context,
    graphiql: true,
  }),
)

app.listen(3001)
console.log(`\🚀 Server ready at: http://localhost:3001/graphql`)
