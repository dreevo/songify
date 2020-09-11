import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getSongQuery } from "../queries/queries";

export class SongDetails extends Component {
  displaySongDetails() {
    const { song } = this.props.data;
    if (song) {
      return (
        <div>
          <h2>{song.name}</h2>
          <p>{song.genre}</p>
          <p>{song.artist.name}</p>
          <p>All Songs by this Artist :</p>
          <ul className="other-books">
            {song.artist.songs.map((item) => {
              return <li key={item.name}>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <div>No Songs selected</div>;
    }
  }

  render() {
    return <div id="song-details">{this.displaySongDetails()}</div>;
  }
}

export default graphql(getSongQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.songId,
      },
    };
  },
})(SongDetails);
