const app = document.querySelector("#app")


// components in vanilla js lol
function renderTrackContainer(genre) {
  const wrapper = document.createElement("div")
  wrapper.id = `track-list-wrapper-${genre}`
  wrapper.classList.add("track-wrapper")
  const text = document.createElement('span')
  text.id = "text"
  text.innerText = genre
  wrapper.appendChild(text)
  return wrapper
}

function renderTrack(coverRef, genre, artists, title) {
  const wrapper = document.createElement("div")
  wrapper.id = `track-wrapper-${genre}`
  wrapper.classList.add("track")
  const trackImg = document.createElement("img")
  trackImg.id = "cover"
  trackImg.src = coverRef
  const artistsSpan = document.createElement("span")
  artistsSpan.innerText = artists.join(", ")
  artistsSpan.id = "artists"
  const titleSpan = document.createElement("span")
  titleSpan.id = "title"
  titleSpan.innerText = title
  wrapper.appendChild(trackImg)
  wrapper.appendChild(artistsSpan)
  wrapper.appendChild(titleSpan)
  return wrapper
}

async function fetchSongs() {
  const audioUrl = "/data/audio.json"
  const response = await fetch(audioUrl)
  const songs = await response.json()
  return songs
}

fetchSongs()
  .then((songs) => {
    const genreMap = new Map();

    songs.forEach(song => {
      const track = renderTrack(song.coverUrl, song.genre, song.artists, song.title);

      if (!genreMap.has(song.genre)) {
        genreMap.set(song.genre, []);
      }

      genreMap.get(song.genre).push(track);
    });

    for (let [genre, tracks] of genreMap) {
      const trackContainer = renderTrackContainer(genre);

      tracks.forEach(track => trackContainer.appendChild(track));

      app.appendChild(trackContainer);
    }
  });
