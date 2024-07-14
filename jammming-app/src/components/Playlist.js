//PLAYLIST
async function playlist() {
    
  //Get request to create a new playlist 
  let createAPlaylist = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    }
  };

  const playlist = await fetch('https://api.spotify.com/v1/users/{user_id}/playlists', createAPlaylist);
  const playlistData = await playlist.json();
  const playlistId = playlistData.user_id;

  console.log("User Id is " + playlistId);

  //Add track to a playlist
  let addTrack = {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer ' + accessToken
    }
  };

  const addTrackToPlaylist = await fetch('https://api.spotify.com/v1/playlists/{playlist_id}/tracks', addTrack);
  const addTrackToPlaylistData = await addTrackToPlaylist.json();
  const addTrackToPlaylistId = addTrackToPlaylistData.playlist_id;

  console.log("Playlist id is " + addTrackToPlaylistId);

  //Remove track from a playlist
  let deleteTrack = {
    method: 'DELETE',
    headers: {
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer ' + accessToken
    }
  };
  const deleteTrackFromPlaylist = await fetch('https://api.spotify.com/v1/playlists/{playlist_id}/tracks', deleteTrack);
  const deleteTrackFromPlaylistData = await deleteTrackFromPlaylist.json();
  const deleteTrackFromPlaylistId = deleteTrackFromPlaylistData.playlist_id;

  console.log("The track you're deleting is " + deleteTrackFromPlaylistId)

  //Save playlist in spotify
  let savePlaylist = {
    method: 'PUT',
    headers: {
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer ' + accessToken
    }
  };
  const savePlaylistToSpotify = await fetch('https://api.spotify.com/v1/me', savePlaylist);
  const savePlaylistToSpotifyData = await savePlaylistToSpotify.json();
  const savePlaylistToSpotifyId = savePlaylistToSpotifyData.spotify_id;

  console.log("The spotify playlist is " + savePlaylistToSpotifyId);
};


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
    if (!playlistTracks.length) {
      alert('Add some tracks to the playlist first!');
      return;
    }
    const playlistName = prompt('Enter a name for your playlist:');
    if (!playlistName) {
      alert('Playlist name is required.');
      return;
    }
    alert('Playlist saved to Spotify!');
  }

  /*const handleLogin = () => {
    <a href={loginUrl} id="signButton"><button>Save to Spotify</button></a>
  }

  //Make a function of a bunch of function to get them called all together from one button
  const saveSpotify = async () => {
    handleLogin();
    addToSpotify();  
  };*/
