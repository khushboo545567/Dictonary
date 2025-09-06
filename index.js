const inputSearch = document.getElementById("inputSearch");
const searchBtn = document.getElementById("searchBtn");
const StartLine = document.getElementById("StartLine");
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const meaningList = document.getElementById("meaningList");
const Notfound = document.getElementById("Notfound");

searchBtn.addEventListener("click", async () => {
  const word = inputSearch.value.trim();
  console.log(word);
  if (!word) {
    return;
  }
  inputSearch.value = "";
  const data = await fetchMeaning(word);
  renderMeanings(data);
});

async function fetchMeaning(word) {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.log("word not found ");
    //    notFount();
    return [];
  }
  const data = await res.json();
  console.log(data);
  return data;
}

function renderMeanings(data) {}

function Notfound() {}
