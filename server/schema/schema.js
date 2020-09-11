const graphql = require("graphql");
const Song = require("../models/song");
const Artist = require("../models/artist");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const SongType = new GraphQLObjectType({
  name: "Song",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    genre: {
      type: GraphQLString,
    },
    artist: {
      type: ArtistType,
      resolve(parent, args) {
        return Artist.findById(parent.artistId);
      },
    },
  }),
});

const ArtistType = new GraphQLObjectType({
  name: "Artist",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    age: {
      type: GraphQLInt,
    },
    songs: {
      type: new GraphQLList(SongType),
      resolve(parent, args) {
        return Song.find({ artistId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    song: {
      type: SongType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Song.findById(args.id);
      },
    },
    artist: {
      type: ArtistType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Artist.findById(args.id);
      },
    },
    songs: {
      type: new GraphQLList(SongType),
      resolve(parent, args) {
        return Song.find();
      },
    },
    artists: {
      type: new GraphQLList(ArtistType),
      resolve(parent, args) {
        return Artist.find();
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addArtist: {
      type: ArtistType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        let artist = new Artist({
          name: args.name,
          age: args.age,
        });
        return artist.save();
      },
    },
    addSong: {
      type: SongType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        artistId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let song = new Song({
          name: args.name,
          genre: args.genre,
          artistId: args.artistId,
        });
        return song.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
