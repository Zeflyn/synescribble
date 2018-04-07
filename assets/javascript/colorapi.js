var hexColor = "";
var color = hexColor;

$(document).ready(() => {
  $('#colorBtn').on("click", function() {
    $("#colorSection").html("");
      // mode choices: monochrome monochrome-dark monochrome-light analogic complement analogic-complement triad quad
      // analogic-complement mode gives colors that are adjacent and across from each other on the color wheel
      let color = makeColor();
      let queryURL = "https://www.thecolorapi.com/scheme?rgb=" + color + "&mode=analogic&count=6";
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
        console.log(response.colors);
        var colorApi = response.colors;
        for (i = 0; i < colorApi.length; i++){
          var colorSq = $('<div class="colorSq">').addClass("thumbnail");
          var hexColor = colorApi[i].hex.value;
          console.log(hexColor);
          colorSq.attr("data-color", hexColor);
          colorSq.css("background", hexColor);
         $('#colorSection').append(colorSq);
        }
      });
  });

  function makeColor() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return r + "," + g + "," + b;
  }
});