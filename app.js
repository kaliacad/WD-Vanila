document.getElementById("searchButton").addEventListener("click", function () {
  const searchTerm = document.getElementById("searchQuery").value.trim();

  if (!searchTerm) {
    alert("Please enter a search term.");
    return;
  }

  const endpoint = "https://www.wikidata.org/w/api.php";
  const params = {
    origin: "*",
    action: "wbsearchentities",
    format: "json",
    search: searchTerm,
    language: "en",
  };

  const queryString = new URLSearchParams(params).toString();

  fetch(`${endpoint}?${queryString}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const resultsContainer = document.getElementById("results");
      resultsContainer.innerHTML = "";

      if (data.search && data.search.length > 0) {
        data.search.forEach((item) => {
          const resultDiv = document.createElement("div");
          resultDiv.className = "result";

          const label = item.label || "No label";
          const description = item.description || "No description";
          const entityURL = `https://www.wikidata.org/wiki/${item.id}`;

          resultDiv.innerHTML = `
                  <strong>${label}</strong>: ${description}
                  <br>
                  <a href="${entityURL}" target="_blank">View on Wikidata</a>
              `;

          resultsContainer.appendChild(resultDiv);
        });
      } else {
        resultsContainer.innerHTML = "No results found.";
      }
    })
    .catch((error) => {
      console.error("Request error:", error);
      alert("An error occurred while processing the request.");
    });
});
