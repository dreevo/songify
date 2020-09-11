const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const { dbUri } = require("./dbFiles/dbCredentials");

const app = express();

mongoose.connect(dbUri, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.connection.once("open", () => {
  console.log("connected to mongoose");
});

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, () => {
  console.log("server listening on port 4000");
});
