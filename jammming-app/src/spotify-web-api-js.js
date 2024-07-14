// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQBNVmQxgIbiAYeH-ptAu9ROufCrhdvgY36h1YzGTvIOjzpy504pUUnbA6dNOIiNXumupdtXXcQBpY4L1D1MJragCKQQedi373EbGFSa8rIs7xzLVivfWYLjv40WUajlYbtvZa8XAFDIqe40ayXQBu-PpomFeq9ysIWYE4-chAVpTM9BCX0VSJ0W73GCmXRfZAK__x2ZxlB2TtmxjbbIvtL-wgcOKXPWprqUjy--3wbscGC6cv4S7JOd_fU8Z5MSt0kg9giu4Q';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

const tracksUri = [
  'spotify:track:0aMM8iOWrJ8GQ7kxK6qjNQ','spotify:track:4klMeclMmLvI6OyLz0iMf1','spotify:track:3HVePjHJWt5uI9HtHgV4aM','spotify:track:6YpAg0Hp0RNg7ipjqvsPaX','spotify:track:2fDvxV1N7SxQYbWNrN7YJl','spotify:track:4lHOVmWsKUBwfRoikWtunT','spotify:track:5tqyZmF6uEoTkD6ja7KZjv','spotify:track:5EQjO4dIVCU6FUKrmkJ13M','spotify:track:73GZSl4HAwavTTCQY9eZtW','spotify:track:3CG8Jn9IVSj7Ylr1Xdg0Sj'
];

async function createPlaylist(tracksUri){
  const { id: user_id } = await fetchWebApi('v1/me', 'GET')

  const playlist = await fetchWebApi(
    `v1/users/${user_id}/playlists`, 'POST', {
      "name": "My recommendation playlist",
      "description": "Playlist created by the tutorial on developer.spotify.com",
      "public": false
  })

  await fetchWebApi(
    `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
    'POST'
  );

  return playlist;
}

const createdPlaylist = await createPlaylist(tracksUri);
console.log(createdPlaylist.name, createdPlaylist.id);
