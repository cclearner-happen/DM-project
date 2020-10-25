var loadFile = (event) => {
  var image = document.getElementById("inputImage");
  image.src = URL.createObjectURL(event.target.files[0]);
};
