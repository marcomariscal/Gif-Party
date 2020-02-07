$(document).ready(function() {
  // after form submission, get the search input and corresponding result from api
  $("#search-form").on(
    "submit",

    function(e) {
      e.preventDefault();

      let query = $("input")
        .eq(0)
        .val();

      $(this).trigger("reset");

      getResultFromApi(query);
    }
  );

  async function getResultFromApi(query) {
    const baseURL = "https://api.giphy.com/v1/gifs/search";
    const apiKey = "YMxmYWXu4cP2KIpBx10vCYHZGT8LNqcj";
    const url = `${baseURL}?q=${query}&api_key=${apiKey}`;

    try {
      let {
        data: { data }
      } = await axios.get(url);

      const numResults = data.length;
      const randIdx = Math.floor(Math.random() * numResults);

      let imageURL = data[randIdx].images.original.url;
      addImg(imageURL);
    } catch (error) {
      alert("There was an error retrieving your gif!");
    }
  }

  function addImg(imageURL) {
    $("#img-container").append($("<img>").attr("src", imageURL));
  }

  $("#remove-button").on("click", function() {
    $("#img-container").empty();
  });
});
