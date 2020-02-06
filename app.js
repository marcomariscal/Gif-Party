$(document).ready(function() {
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
    const baseURL = "http://api.giphy.com/v1/gifs/search";
    const apiKey = "YMxmYWXu4cP2KIpBx10vCYHZGT8LNqcj";
    const url = `${baseURL}?q=${query}&api_key=${apiKey}`;

    try {
      let {
        data: { data }
      } = await axios.get(url);

      let imageURL = data[0].url;
      $("<div>").append($("<img>").attr("src", imageURL));
    } catch (error) {
      alert("There was an error retrieving your gif!");
    }
  }
});
