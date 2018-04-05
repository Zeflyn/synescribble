$(document).ready(() => {

    $('#colorBtn').on("click", function() {
        // mode choices: monochrome monochrome-dark monochrome-light analogic complement analogic-complement triad quad
        // analogic-complement mode gives colors that are adjacent and across from each other on the color wheel
        var hex = "0047AB";
        var queryURL = "https://thecolorapi.com/scheme?" + hex + "&rgb=0,71,171&hsl=215,100%,34%&cmyk=100,58,0,33&format=json&mode=analogic-complement&count=6" 
      
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          console.log(response);
      
      var colorApi = response.colors;
      
      for (i = 0; i < colorApi.length; i++){
      var colorSq = $('<div>').addClass('colorSq');
      var hex = colorApi.hex.value;
      console.log(hex);
      
      $('#colorPallette').append(colorSq);
      console.log(img);
      
              }
          });
      
      });



});