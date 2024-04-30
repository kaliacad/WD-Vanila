document.getElementById("searchButton").addEventListener("click", function () {
  const query = document.getElementById("searchQuery").value;

  if (query === "") {
    alert("Enter a subject of search please.");
    return;
  }

  const url = "https://www.wikidata.org/w/api.php";
  const params = {
    action: "wbsearchentities",
    format: "json",
    search: query,
    language: "en",
  };

  fetch(url, {
    method: "GET",
    params: params,
  })
    .then((response) => response.json())
    .then((data) => {
      const resultsContainer = document.getElementById("results");
      resultsContainer.innerHTML = "";

      const results = data.search;

      if (results.length === 0) {
        resultsContainer.innerHTML = "No result found.";
        return;
      }

      results.forEach((result) => {
        const resultDiv = document.createElement("div");
        resultDiv.className = "result";
        resultDiv.innerHTML = `<strong>${result.label}</strong> - 
            <a href="https://www.wikidata.org/wiki/${result.title}" target="_blank">View on Wikidata</a>`;
        resultsContainer.appendChild(resultDiv);
      });
    })
    .catch((error) => {
      console.error("Error during Wikidata search:", error);
      alert("An error occurred while searching.");
    });
});
