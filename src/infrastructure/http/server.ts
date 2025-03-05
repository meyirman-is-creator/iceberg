import express from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { schema, rootResolvers } from "../graphql/schema";

export async function startServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      rootValue: rootResolvers,
      graphiql: true,
    })
  );

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}/graphql`);
  });
}
