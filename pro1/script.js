const elementById = (id) => {
  return document.getElementById("keyword");
};
const handleSearch = () => {
  const keyword = elementById("keyword");
  const url = `https://theaudiodb.com/api/v1/json/2/search.php?s=${keyword.value}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showArtists(data));
};

const showArtists = ({ artists }) => {
  const artistContainer = document.getElementById("artists");
  artists.forEach((artist) => {
    const div = document.createElement("div");

    div.innerHTML = `<p>${artist.strArtist}`;

    artistContainer.appendChild(div);
  });
};
