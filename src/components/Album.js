import React, { Component } from "react";
import albumData from "./../data/albums";
import PlayerBar from "./PlayerBar";

//Class based component
class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find(album => {
      return album.slug === this.props.match.params.slug;
    });
    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      volume: 80,
      isPlaying: false,
      isHovered: false
    };
    this.audioElement = document.createElement("audio");
    this.audioElement.src = album.songs[0].audioSrc;
    this.formatTime = this.formatTime.bind(this);
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: e => {
        this.setState({
          currentTime: this.audioElement.currentTime
        });
      },
      durationchange: e => {
        this.setState({
          duration: this.audioElement.duration
        });
      },
      volumechange: e => {
        this.setState({
          volume: this.audioElement.volume
        });
      }
    };
    this.audioElement.addEventListener(
      "timeupdate",
      this.eventListeners.timeupdate
    );
    this.audioElement.addEventListener(
      "durationchange",
      this.eventListeners.durationchange
    );
    this.audioElement.addEventListener(
      "volumechange",
      this.eventListeners.volumechange
    );
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener(
      "timeupdate",
      this.eventListeners.timeupdate
    );
    this.audioElement.removeEventListener(
      "durationchange",
      this.eventListeners.durationchange
    );
    this.audioElement.removeEventListener(
      "volumechange",
      this.eventListeners.volumechange
    );
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) {
        this.setSong(song);
      }
      this.play();
    }
  }
  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(
      song => this.state.currentSong === song
    );
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(
      song => this.state.currentSong === song
    );
    const newIndex = Math.min(
      this.state.album.songs.length - 1,
      currentIndex + 1
    );
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }
  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }
  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({
      volume: newVolume
    });
  }

  formatTime(totalSeconds) {
    if (isNaN(totalSeconds)) {
      return "-:--";
    }

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
    let seconds = totalSeconds - hours * 3600 - minutes * 60;

    seconds = Math.round(seconds);
    //If remaining seconds is less than ten then output zero
    let result = minutes < 10 ? minutes : minutes;
    result += ":" + (seconds < 10 ? "0" + seconds : seconds);
    return result;
  }

  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img
            id="album-cover-art"
            src={this.state.album.albumCover}
            alt={this.state.album.slug}
          />
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
            {this.state.album.songs.map((song, index) => (
              <tr
                className="song"
                key={index}
                onClick={() => this.handleSongClick(song)}
                onMouseEnter={() => this.setState({ isHovered: index + 1 })}
                onMouseLeave={() => this.setState({ isHovered: false })}
              >
                <td className="song-actions">
                  <button id="song-action-btns">
                    {this.state.currentSong.title === song.title ? (
                      <span
                        className={
                          this.state.isPlaying ? "ion-pause" : "ion-play"
                        }
                      />
                    ) : this.state.isHovered === index + 1 ? (
                      <span className="ion-play" />
                    ) : (
                      <span className="song-number">
                        {index + 1}
                        <tr id="color-title1">
                          {this.state.currentSong.title.isHovered === song[0]}
                        </tr>
                      </span>
                    )}
                  </button>
                </td>
                <td className="song-title">{song.title}</td>
                <td className="color-title" />

                <td className="song-duration">
                  {this.formatTime(song.duration)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentTime={this.audioElement.currentTime}
          duration={this.audioElement.duration}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={e => this.handleTimeChange(e)}
          handleVolumeChange={e => this.handleVolumeChange(e)}
          formatTime={seconds => this.formatTime(seconds)}
        />
      </section>
    );
  }
}
export default Album;
