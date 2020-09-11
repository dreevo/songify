import React, { Component } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";

import {
  getArtistsQuery,
  getSongsQuery,
  addSongMutation,
} from "../queries/queries";

export class AddSong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      artistId: "",
    };
  }

  displayArtists() {
    var data = this.props.getArtistsQuery;
    if (data.loading) {
      return <option disabled>Loading Artists...</option>;
    } else {
      return data.artists.map((artist) => {
        return (
          <option key={artist.id} value={artist.id}>
            {artist.name}
          </option>
        );
      });
    }
  }

  submitForm(e) {
    e.preventDefault();
    this.props.addSongMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        artistId: this.state.artistId,
      },
      refetchQueries: [
        {
          query: getSongsQuery,
        },
      ],
    });
  }
  render() {
    return (
      <form id="add-song" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Song name:</label>
          <input
            type="text"
            onChange={(e) => this.setState({ name: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            onChange={(e) => this.setState({ genre: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Artist:</label>
          <select onChange={(e) => this.setState({ artistId: e.target.value })}>
            <option>Select Artist</option>
            {this.displayArtists()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getArtistsQuery, { name: "getArtistsQuery" }),
  graphql(addSongMutation, { name: "addSongMutation" })
)(AddSong);
