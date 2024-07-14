import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, InputGroup, FormControl, Button, Row, Card, Col} from 'react-bootstrap';
import { useState, useEffect } from 'react';

//To import icons from FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faBackward, faForward, faPause } from '@fortawesome/free-solid-svg-icons';

//Tell the app where you want to bring the user and where you want to bring them back after authorizing
export const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3000/";

const CLIENT_ID = 'ca09ec1659a346708d91cbadf4ff3c7a';
const CLIENT_SECRET = 'f267070f89d144bfad91d89468e24454';

//Add list of scope to tell our app what the user can do through Spotify app.
const scope = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
  "playlist-modify-private", //needed to add items to a playlist and remove items from a playlist
  "playlist-modify-public",
  "user-read-private"
]

//Construct the URL we want to send our user to when they press the log-in button
export const loginUrl = `${authEndpoint}?
client_id=${CLIENT_ID}
&redirect_uri=${redirectUri}
&scope=${scope.join("%20")}
&response_type=token
&show_dialog=true`

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);

  //For the control players
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);

  //For playTrack()
  const [progress, setProgress] = useState("");
  const [duration, setDuration] = useState("");

  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    //API Access Token - specific request
    let authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }

    fetch('https://accounts.spotify.com/api/token', authParameters)
    .then(result => result.json())
    .then(data => setAccessToken(data.access_token))
  }, [])

  //SEARCH - look at the documentation of Spotify - tells you what you have to do
  async function search() {
    console.log("Search for " + searchInput);

    //To throw an alert if search input is empty
    if (!searchInput) {
      alert('Please enter an artist or a title');
      return
    }

    //Get request using search to get the Artist ID
    let searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    };

    const artistResponse = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=artist`, searchParameters);
    const artistData = await artistResponse.json();
    const artistID = artistData.artists.items[0]?.id;
    console.log("Artist ID is " + artistID);

    //Get request with Artist ID to grab all the albums from that artist
    const albumsResponse = await fetch(`https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=US&limit=50`, searchParameters);
    const albumsData = await albumsResponse.json();
    setAlbums(albumsData.items);

    //Tracks
    const tracksResponse = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=track&market=US&limit=50`, searchParameters);
    const tracksData = await tracksResponse.json();
    setTracks(tracksData.tracks.items);

    //Clear the input field after search + value in <InputGroup>
    setSearchInput("");
  
    console.log(albums);
    console.log(tracks);
   
  };

  //Give functionality to my icons made as buttons
  //Play the music, check url, check that there is no current audio playing otherwise pauses it, update the state
  const initializeAudio = (tracks) => {
    if (tracks.preview_url) {
      const newAudio = new Audio(tracks.preview_url);
      setAudio(newAudio);

      newAudio.onended = () => {
        setIsPlaying(false);
      };

      newAudio.ontimeupdate = () => {
        setProgress(newAudio.currentTime);
        setDuration(newAudio.duration);
      };

      newAudio.oncanplay = () => {
        newAudio.play();
        setIsPlaying(true);
      };
    }
  };
    
  const handleTrackClick = (tracks, index) => {
    if (audio) {
      audio.pause();
    }
    setCurrentTrack(tracks);
    setCurrentTrackIndex(index);
  };

  useEffect(() => {
    if (currentTrack) {
      initializeAudio(currentTrack);
  }

  //Cleanup previous audio when tracks change
  return () => {
      if (audio) {
        audio.pause();
        setAudio(null);
        setIsPlaying(false);
        setProgress(0);
        setDuration(0);
      }
  };
  }, [currentTrack]);

  const handlePlayClick = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
    setIsPlaying(!isPlaying);
    }
  };

  //code for the progress bar
  useEffect(() => {
    if (tracks && tracks.preview_url) {
      playTrack(tracks);
    } else { //stop the progress bar from moving even with no music
      if (audio) {
        audio.pause();
      }
      setAudio(null);
      setIsPlaying(false);
      setProgress(0);
      setDuration(0);
    }
  }, [tracks]);

  //Implement functionality to play the next track
  const handleForwardClick = () => {
  console.log("Handle Forward Click");
    if (currentTrackIndex < tracks.length - 1) {
      const nextTrackIndex = currentTrackIndex + 1;
      setCurrentTrackIndex(nextTrackIndex);
      setCurrentTrack(tracks[nextTrackIndex]);
      handlePlayClick(tracks[nextTrackIndex]);    
    }
  };

    //Implement functionality to play the previous track
    const handleBackwardClick = () => {
    console.log("Handle Backward Click");
    if (currentTrackIndex > 0) {
      const previousTrackIndex = currentTrackIndex - 1;
      setCurrentTrackIndex(previousTrackIndex);
      setCurrentTrack(tracks[previousTrackIndex]);
      handlePlayClick(tracks[previousTrackIndex]);
    }
    };

  //To render the current track on the screen
  const showTrack = () => {
  console.log("Here is the track you\'re listening to");
      if (currentTrack) {
        return (
          <div className="current-track">
            <img src="currentTrack.album.images[0]?.url" alt="Track cover"/>
            <div>
              <h3>{currentTrack.name}</h3>
              <p>{currentTrack.artists[0]?.name}</p>
            </div>
          </div>
          
        )
      } else {
        return null;
      }
  };

  useEffect(() => {
  showTrack();
  }, [currentTrack]);

  //Tracks/albums hide/show
  //Styling
  const h2 = {
  textDecoration: 'underline',
  }

  const handleButtonClick = () => {
  setButtonClicked(true);
  };

  const hasSearch = () => {
    if (buttonClicked && search) {
      return <h2 style={h2}>Tracks</h2>;
    } else {
      console.log("Nope, not showing.");
      return null;
    }
    };

  const hasSearch2 = () => {
    if (buttonClicked && search) {
      return <h2 style={h2}>Albums</h2>;
    } else {
      console.log("Nope, not showing.");
      return null;
    }
  };

  //Make a function of a bunch of function to get them called all together from one button
  const searchTrack = () => {
  handleButtonClick();
  search();
  };

  //PLAYLIST
  //Functionality to the "add/remove to playlist" button
    const [playlistTracks, setPlaylistTracks] = useState([]);
    
    const addButton = (track) => {
     if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
     }
     setPlaylistTracks([...playlistTracks, track]);
    };
  
    const removeButton = (track) => {
      setPlaylistTracks(playlistTracks.filter(currentTrack => currentTrack.id !== track.id));
    };

    const addToSpotify = async () => {
      //To alert you if you have no track in your playlist
      if (!playlistTracks.length) {
        alert('Add some tracks to the playlist first!');
        return;
      }

      const playlistName = prompt('Enter a name for your playlist:');
      //To alert you if you have no name in your playlist
        if (!playlistName) {
          alert('Playlist name is required.');
          return;
        }
      
        try { 
          const getTokenFromUrl = () => {
            const hash = window.location.hash;
            const params = new URLSearchParams(hash.replace('#', ''));
            const accessToken = params.get('access_token');
            return accessToken;
            };

          const accessToken = getTokenFromUrl();

          const scope = [
            "user-read-currently-playing",
            "user-read-recently-played",
            "user-read-playback-state",
            "user-top-read",
            "user-modify-playback-state",
            "playlist-modify-private", //needed to add items to a playlist and remove items from a playlist
            "playlist-modify-public",
            "user-read-private"
          ]
          
          // Get user profile to obtain the user ID
          let getUserResponse = {
            method: 'GET',
            headers: {
              'Content-Type' : 'application/json',
              'Authorization' : 'Bearer ' + accessToken
            }
          };

          const userResponse = await fetch('https://api.spotify.com/v1/me', getUserResponse);
          const userData = await userResponse.json();
          const userId = userData.id;
          console.log("User ID is : " + userId);
        
          //Get request to create a new playlist 
          const createAPlaylist = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
          },
          body: JSON.stringify({
            name: playlistName,
            description: 'My playlist description',
            public: false,
          }),
        };

        const playlist = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, createAPlaylist);
        const playlistData = await playlist.json();
        const playlistId = playlistData.id;

        console.log("User Id is " + playlistId);

        // Prepare track URIs for adding to the playlist
        const trackUris = playlistTracks.map(track => track.uri);
    
        // Add tracks to the playlist
        const addTracksResponse = { 
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              uris: trackUris,
              position: 0
          })
        };

          const addTracksToPlaylist = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, addTracksResponse);
    
        if (!addTracksToPlaylist.ok) {
          const errorData = await addTracksToPlaylist.json();
          throw new Error(`Failed to add tracks to playlist: ${errorData.error.message}`);
        }
    
        alert('Playlist created and tracks added successfully!');
      } catch (error) {
        console.error('Error creating playlist:', error);
        alert(`Failed to create playlist: ${error.message}`);
      }
    }

  return (
    <div className="App">
      <header className="App-header">
        <img id="logo" src="https://onedrive.live.com/embed?resid=3B321C3E3EB27E40%213674&authkey=%21AHOhoXDvWrkqS-o&width=542&height=360" width="180" height="120"/>
        <h1 id="title">Jammming App</h1>
      </header>

      <section className="search">
        {/*Create the container for the results*/}
        <Container fluid>
          <Row>
            {/*Left column for search and results*/}
            <Col md={8}>
            <InputGroup className="mb-3 vw-50" size="large" id="searchbar">
            <FormControl
              placeholder="Search For Artist or Title"
              type="input"
              onKeyPress={event => {
                if (event.key == "Enter") {
                  searchTrack();
                }
              }}
              onChange={event => setSearchInput(event.target.value)}
              
              //This is to reset input value + setSearchInput("") in search function
              value={searchInput} />
          
              <Button id="button" onClick={searchTrack}>
                Search
              </Button>
          </InputGroup>
        
          {/*Different container to show off the result*/}
          <Container className="pb-3" id="results">
          <h2 className="category"></h2>
          {hasSearch()}
          <Row className="mx-2 row row-cols-2 row-cols-md-4 row-cols-lg-4">
            {tracks.map( (track, i) => {
              return (
                <Card className="mb-2 text-center">
                  <Card.Img src={track.album.images[0]?.url} className="mt-2" style={{cursor: "pointer"}} onClick={() => handleTrackClick(track, i)}/>
                  <Card.Body>
                    <Card.Title className="card-text=center">{track.name}</Card.Title>
                  </Card.Body>
                  <button id="add" onClick={() => addButton(track)}>Add to Playlist</button>
                </Card>
                )
            })}
          </Row>

          <h2 className="category"></h2>
          {hasSearch2()}
          <Row className="mx-2 row row-cols-2 row-cols-md-4 row-cols-lg-4">
            {albums.map( (album, i) => {
              return (
                <Card className="mb-2">
                  <Card.Img src={album.images[0].url} className="mt-2"/>
                  <Card.Body>
                    <Card.Title className="card-text=center">{album.name}</Card.Title>
                  </Card.Body>
                </Card>
                )
            })}
          </Row>
        </Container>
        </Col>

        {/*Right column for playlist*/}
        <Col md={4}>
        <Container>
          <Row className="mx-2 col-4" id="playlist">
          <Card id="spotify-playlist">
              <Card.Title>Your playlist here</Card.Title>
              <Card.Body>
                {/*<input 
                placeholder="Name your playlist here"
                type="input">
                </input>*/}
                <div id="playlist-card">
                <ul id="unordered-list">
                  {playlistTracks.map(tracks => (
                    <li id="list-track" key={tracks.id}>
                      {tracks.name}
                      <button id="remove" onClick={() => removeButton(tracks)}> X </button>
                    </li>
                  ))}         
                </ul>
                </div>
                {/*This is to redirect to spotify*/}
                <button id="spotify" onClick={() => addToSpotify()}>Save to Spotify</button>
              </Card.Body>
          </Card>
          </Row>
        </Container>
        </Col>
        </Row>
        </Container>
      </section>

      <footer>
        {/*Call the function to show the title*/}
        {showTrack()}
        
        <div className="progress-bar">
            <div className="range">
              <div className="thumb">
                {/*Make the progress bar*/}
                <progress value={progress} max={duration}></progress>
              </div>
                {Math.floor(progress)} / {Math.floor(duration)} seconds
            </div>
        </div>
        
        {/*Buttons*/}
        <div>
          <button className="btn" onClick={handleBackwardClick} ><FontAwesomeIcon icon={faBackward} className="icon" size='2x'/></button>
          <button className="btn" onClick={handlePlayClick} ><FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className="icon" size='2x' /></button>
          <button className="btn" onClick={handleForwardClick} ><FontAwesomeIcon icon={faForward} className="icon" size='2x' /></button>
        </div>
      </footer> 
    </div>
  );
};

export default App;
