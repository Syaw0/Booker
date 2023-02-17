import next from "next";
import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { graphqlHTTP } from "express-graphql";
import schema from "./graphql/schema";
import rootValue from "./graphql/handlers";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const nextApp = next({ dev, hostname, port });
const handle = nextApp.getRequestHandler();
nextApp
  .prepare()
  .then(async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(
      "/graphql",
      graphqlHTTP({ schema: schema, rootValue: rootValue, graphiql: dev })
    );
    app.get("*", (req, res) => {
      return handle(req, res);
    });
    app.listen(port, () => {
      console.log(`listen on ${hostname}:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
