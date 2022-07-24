const elementById = (id) => {
  return document.getElementById(id);
};

const handelSearch = () => {
  const keyword = elementById("keyword");
  const artistContainer = elementById("artists");
  const albumContainer = document.getElementById("albums");

  const url = `https://theaudiodb.com/api/v1/json/2/search.php?s=${keyword.value}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => showArtist(data));

  keyword.value = "";
  artistContainer.innerHTML = "";
  albumContainer.innerHTML = "";
};

const showArtist = ({ artists }) => {
  const blankImgUrl = `https://i0.wp.com/aungmyat.co.uk/wp-content/uploads/2015/07/Facebook-Blank-Photo.jpg?fit=500%2C410&ssl=1`;

  const artistContainer = elementById("artists");
  artists.forEach((artist) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card" style="width: 20rem; margin: auto;">
        <img src="${artist.strArtistThumb ? artist.strArtistThumb : blankImgUrl}" class="card-img-top" alt="..." />
        <div class="card-body info">
            <h1 class="card-title">${artist.strArtist ? artist.strArtist : "Not Available..."}</h1>
            <p class="card-text">Country: ${artist.strCountry ? artist.strCountry : "Not Available..."}</p>
            <p class="card-text">Style: ${artist.strStyle ? artist.strStyle : "Not Available"}</p>
            <a href="#" onclick="fetchAlbum('${artist.idArtist}')" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
        `;
    artistContainer.appendChild(div);
  });
};

const fetchAlbum = (id) => {
  const artistContainer = elementById("artists");
  const url = `https://theaudiodb.com/api/v1/json/2/album.php?i=${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showAlbums(data));

  artistContainer.innerHTML = "";
};

const showAlbums = ({ album }) => {
  const blankImgUrl = `https://media.istockphoto.com/vectors/love-music-neon-sign-vector-id1090431366?k=20&m=1090431366&s=612x612&w=0&h=b904gY5gkqF3iL5REIcJXK--GQmOZyNfyUGtlvssMpc=`;
  console.log(album);
  const albumContainer = document.getElementById("albums");
  album.forEach((file) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
      <div class="card" style="width: 18rem;">
      <img src="${file.strAlbumThumb ? file.strAlbumThumb : blankImgUrl}" class="card-img-top" alt="">
      <div class="card-body">
        <p class="card-text">${file.strAlbum}</p>
      </div>
      </div>
    `;
    albumContainer.appendChild(div);
  });
};
// ternary operator:-
// const num = 5;
// const res = num > 0 ? "positive" : num < 0 ? "negative" : "zero";
// console.log(res);
