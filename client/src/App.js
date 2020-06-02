import React, {Component} from "react"
import ReactTypingEffect from "react-typing-effect"

import "./App.css"

import SpotifyWebApi from "spotify-web-api-js"
const spotifyApi = new SpotifyWebApi()

class App extends Component {
  constructor() {
    super()
    const params = this.getHashParams()
    const token = params.access_token
    if (token) {
      spotifyApi.setAccessToken(token)
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: {name: "", albumArt: "", artist: "", album: ""}
    }
  }
  getHashParams() {
    var hashParams = {}
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1)
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2])
      e = r.exec(q)
    }
    return hashParams
  }

  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState().then(response => {
      this.setState({
        nowPlaying: {
          name: "Song: " + response.item.name,
          albumArt: response.item.album.images[0].url,
          artist: "Artist: " + response.item.artists[0].name,
          album: "Album: " + response.item.album.name
        }
      })
    })
  }
  render() {
    return (
      <div className="App">
        <a className="login" href="http://localhost:8888">
          {" "}
          <button> Login to Spotify</button>
        </a>
        <div>
          <ReactTypingEffect
            className="typist"
            text="Whats playin? :)" //text=["Hello.", "World!"]
          />
          <div className="whatsplayin">
            <div className="nowPlaying">{this.state.nowPlaying.name}</div>
            <div className="nowPlaying"> {this.state.nowPlaying.artist}</div>
            <div className="nowPlaying">{this.state.nowPlaying.album}</div>
          </div>
          <div>
            <img src={this.state.nowPlaying.albumArt} style={{height: 200}} />
          </div>
          {this.state.loggedIn && (
            <button onClick={() => this.getNowPlaying()}>
              Check Now Playing
            </button>
          )}
        </div>
      </div>
    )
  }
}

export default App
