$(document).ready(() => {




    $('#colorBtn').on("click", function() {

      
        // mode choices: monochrome monochrome-dark monochrome-light analogic complement analogic-complement triad quad
        // analogic-complement mode gives colors that are adjacent and across from each other on the color wheel
        let color = makecolor();
        let queryURL = "https://www.thecolorapi.com/scheme?rgb=" + color + "&mode=analogic&count=6";
      
        function makecolor() {
          let r = Math.floor(Math.random() * 255);
          let g = Math.floor(Math.random() * 255);
          let b = Math.floor(Math.random() * 255);
          return r + "," + g + "," + b;
        }

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          console.log(response);
      
      var colorApi = response.colors;
      
      for (i = 0; i < colorApi.length; i++){
      var colorSq = $('<div>').addClass('colorSq', 'thumbnail');

      // var hex = colorApi.hex.value;
      // console.log(hex);
    //   loop through hex values to generate more colors based on mode
      
      $('#colorPallette').append(colorSq);
      
      
              }

          });
      
      });



});