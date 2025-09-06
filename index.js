const inputSearch = document.getElementById("inputSearch");
const searchBtn = document.getElementById("searchBtn");
const StartLine = document.getElementById("StartLine");
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const meaningList = document.getElementById("meaningList");
const Notfound = document.getElementById("Notfound");
const speaker = document.getElementById("speaker");
const loading = document.getElementById("loading");

Notfound.classList.add("hidden");
StartLine.classList.remove("hidden");

searchBtn.addEventListener("click", async () => {
  const word = inputSearch.value.trim();
  console.log(word);
  if (!word) {
    return;
  }
  inputSearch.value = "";
  const data = await fetchMeaning(word);
  if (!data) return;
  renderMeanings(data);
});

async function fetchMeaning(word) {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  try {
    StartLine.classList.add("hidden");
    speaker.classList.add("hidden");
    meaningList.classList.add("hidden");
    loading.classList.remove("hidden");
    const res = await fetch(url);
    loading.classList.add("hidden");
    if (!res.ok) {
      notfound();
      return null;
    }
    console.log("Response is there", res);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Network error:", error);
    notfound(); // optional: handle network error
    return null;
  }
}

function renderMeanings(data) {
  StartLine.classList.add("hidden");
  Notfound.classList.add("hidden");
  meaningList.innerHTML = "";
  speaker.classList.remove("hidden");
  meaningList.classList.remove("hidden");
  title.textContent = `${data[0].word}`;
  audio.src = `${data[0].phonetics[0].audio}`;

  const meanings = data[0].meanings[data[0].meanings.length - 1];
  const meaninglist = meanings.definitions;
  console.log(meanings);
  console.log("meaning list", meaninglist);

  meaninglist.map((def) => {
    const li = document.createElement("li");
    li.className = "mb-6 sm:mb-6";
    console.log(def.definition);
    // Meaning section
    const p = document.createElement("p");
    const span = document.createElement("span");
    span.className = "font-bold text-green-600";
    span.textContent = "Meaning : ";
    p.append(span);
    p.append(
      document.createTextNode(def?.definition ?? "No definition available")
    );
    li.append(p);

    // Example section (only if available)
    if (def?.example) {
      const p1 = document.createElement("p");
      const span1 = document.createElement("span");
      span1.className = "font-bold text-green-600";
      span1.textContent = "Example : ";
      p1.append(span1);
      p1.append(document.createTextNode(def.example));
      li.append(p1);
    }

    meaningList.append(li);
  });
}

function notfound() {
  StartLine.classList.add("hidden");
  speaker.classList.add("hidden");
  meaningList.classList.add("hidden");
  Notfound.classList.remove("hidden");
}
