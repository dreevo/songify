import React from "react";
import SongList from "./components/SongList";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import AddSong from "./components/AddSong";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Songify</h1>
        <h2>Songs list :</h2>
        <SongList />
        <AddSong />
      </div>
    </ApolloProvider>
  );
}

export default App;
