import React, { Component } from "react";
import { Link } from "react-router-dom";
//import { Row, Col, Image } from "react-bootstrap";
import albumData from "./../data/albums";
//import ".././styles/Library.css";

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData };
  }

  render() {
    return (
      <section className="row">
        {this.state.albums.map((album, index) => (
          <div className="col-md-6" key={index}>
            <div className="card mb-4 box-shadow">
              <Link to={`/album/${album.slug}`}>
                <img
                  className="card-img-top"
                  src={album.albumCover}
                  alt={album.title}
                />
                <div className="card-body">
                  <p className="display-4">{album.title}</p>
                  <p className="lead">{album.artist}</p>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </section>
    );
  }
}

export default Library;
