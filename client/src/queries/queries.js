import { gql } from "apollo-boost";

const getArtistsQuery = gql`
  {
    artists {
      name
      id
    }
  }
`;

const getSongsQuery = gql`
  {
    songs {
      name
      id
    }
  }
`;

const getSongQuery = gql`
  query($id: ID) {
    song(id: $id) {
      name
      genre
      id
      artist {
        name
        age
        songs {
          name
          id
        }
      }
    }
  }
`;

const addSongMutation = gql`
  mutation($name: String!, $genre: String!, $artistId: ID!) {
    addSong(name: $name, genre: $genre, artistId: $artistId) {
      name
      id
    }
  }
`;

export { getArtistsQuery, getSongsQuery, addSongMutation, getSongQuery };
