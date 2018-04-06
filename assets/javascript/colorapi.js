$(document).ready(() => {
  $('#colorBtn').on("click", function() {
    $("#colorSection").html("");
      // mode choices: monochrome monochrome-dark monochrome-light analogic complement analogic-complement triad quad
      // analogic-complement mode gives colors that are adjacent and across from each other on the color wheel
      // var hex = "0047AB";
      // var queryURL = "https://thecolorapi.com/scheme?" + hex + "&rgb=0,71,171&hsl=215,100%,34%&cmyk=100,58,0,33&format=json&mode=analogic-complement&count=6" 
      let color = makeColor();
      let queryURL = "https://www.thecolorapi.com/scheme?rgb=" + color + "&mode=analogic&count=6";
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
        console.log(response.colors);
        var colorApi = response.colors;
        for (i = 0; i < colorApi.length; i++){
          var colorSq = $('<div class="colorSq">');
          var hexColor = colorApi[i].hex.value;
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