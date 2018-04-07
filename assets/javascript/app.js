paper.install(window);

// color assignment
// moving color variable out here to it can communicate with colorapi.js
let color;

$(document).ready(() => {
  // Firebase setup
  var config = {
    apiKey: "AIzaSyBIxDWLxlf5c7pARWt5wL1LhhiODNA3LMY",
    authDomain: "synescribble.firebaseapp.com",
    databaseURL: "https://synescribble.firebaseio.com",
    projectId: "synescribble",
    storageBucket: "",
    messagingSenderId: "648660572319"
  };
  firebase.initializeApp(config);

  // Codebird setup
  var cb = new Codebird;
  cb.setConsumerKey("N0Djq7HZhA4kgb7o2tK68GAsW", "ClhD1MPkNz1ciAqhVokF2u3PnnjJ0WdXELsIFqmu6NXaZwOSMT");
  cb.setToken("982096680169295873-o2Ay2soexim36nNmdFMozWwO459RXME", "hUVgKilsTAfqEEw9dzpsriRvdmQnvtYY2zArj1BSrq9vh");

  // Assigning our Database and our Canvas to a variable
  const database = firebase.database();
  const canvas = document.getElementById("drawingSurface");
  // Initializing Paper.js to avoid scope issues
  paper.setup(canvas);

  // Paper.js Tool object constructor, handles the drawing functions below
  const tool = new Tool();
  
  // Initialize a variable to create paths in our drawing functions
  color = "#000";
  let path;
  let drawing = {
    artist: "",
    image: ""
  };
 
  // On mouse down...
  tool.onMouseDown = e => {
    // the path variable becomes a Path object via a Paper.js Object Cosntructor
    path = new Path({
      // the point where the mouse was clicked is added to a segments array
      segments: [e.point],
      // stroke color is assigned as the color assigned to the color variable
      strokeColor: color,
      // the width of the stroke is set to 5 pixels
      strokeWidth: 5
    });
  }

  // On mouse drag...
  tool.onMouseDrag = e => {
    // Every time the mouse is dragged, a point given to us by the event argument is added
    // to the segments array
    path.add(e.point);
  }

  // On mouse up...
  tool.onMouseUp = e => {
    // .simplfy, a Paper.js method, "smooths" the line and removes imperfections
    path.simplify(10);
  }
  

  // On color selection.. grab the data-color attribute containing the hex values
  $(document).on("click", ".colorSq", function(){
    color = $(this).attr("data-color");
    console.log(color);
  });

  // On submit click...
  $("#nameSubmit").on("click", () => {
    // Convert Drawing Surface to image data
    let canvasImage = canvas.toDataURL();
    let artist = $("#artist").val().trim();
    let artistArray = artist.split("");
    if(artistArray.length === 0 || artist.length > 12 || artist.indexOf("<") !== -1 || artist.indexOf(">") !== -1) {
      $("#artist").val("");
      $("#artist").css("border", "2px solid red");
      $("#artist").attr("placeholder", "Please submit a valid name (1-12 characters)");
    } else {
      $("#artist").css("border", "2px solid red");
      $("#artist").attr("placeholder", "Please submit a valid name (1-12 characters)");
      drawing.image = canvasImage;
      drawing.artist = artist;
      // Push image data to the database
      database.ref().push(drawing);
      // Post new drawing to twitter bot
      var params = {
        "media_data": canvasImage.substring(22)
      };
      let imageID = "";
      cb.__call("media_upload", params, function (reply, rate, err) {
        imageID = reply.media_id_string;
        cb.__call(
          "statuses_update",
          {
            "media_ids": imageID,
            "status": "Created By: " + artist
          },
          function (reply, rate, err) {
            if(err) {
              console.log(err);
            }
          });
        }
      );
      project.clear();
      $("#artist").val("");
      $("#artist").css("border", "none");
      $("#artist").attr("placeholder", "Submit!");
    }
  });

  $("#clear").on("click", function() {
    project.clear();
  });

  // When a new child (aka drawing) is added to the database,
  // pass the data to a function that builds and puts the drawing
  // into the gallery
  database.ref().on("child_added", function(snapshot) {
    let data = snapshot.val();
    makeCanvas(data);
  });

  // Function that handles the creation of the gallery item
  function makeCanvas(drawing) {
    let canvasItem = $("<div><img src='" + drawing.image + "' class='myCanvas'/><p id='artistName'>" + drawing.artist + "</p></div>");
    let databaseDrawing = canvasItem;
    $("#gallery").append(canvasItem);
  }
});