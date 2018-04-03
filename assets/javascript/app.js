paper.install(window);

$(document).ready(() => {
  var config = {
    apiKey: "AIzaSyBIxDWLxlf5c7pARWt5wL1LhhiODNA3LMY",
    authDomain: "synescribble.firebaseapp.com",
    databaseURL: "https://synescribble.firebaseio.com",
    projectId: "synescribble",
    storageBucket: "",
    messagingSenderId: "648660572319"
  };
  firebase.initializeApp(config);

  const database = firebase.database();

  const canvas = document.getElementById("drawingSurface");
  paper.setup(canvas);

  const tool = new Tool();
  let color = "#000";
  let path;

  // let drawing = {
  //   paths: [],
  //   colors: [],
  //   creator: ""
  // };

  // let line = [];
  

  tool.onMouseDown = e => {
    path = new Path({
      segments: [e.point],
      strokeColor: color,
      strokeWidth: 5
    });
    path.add(e.point);
    // drawing.colors.push(color);
  }

  tool.onMouseDrag = e => {
    path.add(e.point);
    // line.push(e.point);
  }

  tool.onMouseUp = e => {
    path.simplify(10);
    // drawing.paths.push(line);
    // console.log(drawing);
  }

  $(document).on("click", "#makeRed", () => {
    color = "#F00";
  });

  $(document).on("click", "#makeBlack", () => {
    color = "#000";
  });

  $("#submit").on("click", () => {
    var img = new Image();
    var canvasImage = canvas.toDataURL();
    img.src = canvasImage;
    database.ref().push(img.src);
    // console.log(img);
    // drawing = {
    //   paths: [],
    //   colors: [],
    //   creator: ""
    // };
    project.clear();
  });

  $("#scale").on("click", function() {
    $(".myCanvas").toggleClass("scale");
  });

  database.ref().on("child_added", function(snapshot) {
    let data = snapshot.val();
    makeCanvas(data);
  });

  function makeCanvas(drawing) {
    let canvasItem = $("<img src='" + drawing + "' class='myCanvas'/>");
    let databaseDrawing = canvasItem;
    $("#gallery").append(canvasItem);
  }

});