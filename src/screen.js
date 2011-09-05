Eskimo.Screen = function(canvas, assets) {
  var context = canvas[0].getContext("2d");
  var imageList = [];

  function clearScreen() {
    context.fillStyle = Eskimo.Screen.BACKGROUND_COLOR;
    context.fillRect(0, 0, canvas.width(), canvas.height());
  }

  function put(image) {
    imageList.push(image);
  }

  this.put = put;

  this.remove = function(assetName) {
    imageList.pop(assetName);
  };

  this.render = function() {
    clearScreen();
    _(imageList).each(function(image) {
      var asset = assets.get(image.name);
      if (asset) {
        context.drawImage(assets.get(image.name), image.x, image.y);
      }
    });
  };

  this.clear = function() {
    imageList = [];
  };

  this.loadScreen = function(json) {
    var images = json.images,
        imageStruct,
        image;

    for(var imageName in images) {
      if (images.hasOwnProperty(imageName)) {
        imageStruct = images[imageName]; 
        image = Eskimo.Image(imageName, imageStruct.location.x, imageStruct.location.y);
        assets.load(imageName, imageStruct.src);
        put(image);
      }
    }
  }
};

Eskimo.Screen.BACKGROUND_COLOR = "#aaaabb";