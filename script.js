function getbooks() {
  let query = document.getElementById("query").value;
  fetch(`https://openlibrary.org/search.json?q=${query}`)
    .then((response) => response.json())
    .then((data) => {
      // Access the book details from the response
      const books = data.docs;
      const bookList = document.createElement("ul");
      books.forEach((book) => {
        const title = book.title;
        const author = book.author_name
          ? book.author_name.join(", ")
          : "Unknown";
        const coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        const bookListItem = document.createElement("li");
        bookListItem.innerHTML = `
        <img src="${coverUrl}" alt="${title} cover" />
        <div>
          <h3>${title}</h3>
          <p>By ${author}</p>
        </div>
      `;
        bookList.appendChild(bookListItem);
      });
      // Append the book details to the HTML document
      const resultsDiv = document.getElementById("results");
      resultsDiv.innerHTML = "";
      resultsDiv.appendChild(bookList);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
