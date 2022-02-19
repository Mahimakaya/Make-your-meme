
  let toptextInput, btmtextInput, imageInput, createBtn, canvas, ctx;
  function create(img, topText, btmText) {
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    let fontSize = canvas.width / 20;
    ctx.font = fontSize + 'px Impact';
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = fontSize / 15;
    ctx.textAlign = 'center';

    ctx.textBaseline = 'top';
    ctx.fillText(topText, canvas.width / 2, 0, canvas.width);
    ctx.strokeText(topText, canvas.width / 2, 0, canvas.width);

    ctx.textBaseline = 'bottom';
    ctx.fillText(btmText, canvas.width / 2, canvas.height, canvas.width);
    ctx.strokeText(btmText, canvas.width / 2, canvas.height, canvas.width);
  }
  function text() {
    toptextInput = document.getElementById('top-text');
    btmtextInput = document.getElementById('bot-text');
    imageInput = document.getElementById('img');
    createBtn = document.getElementById('btn');
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = canvas.height = 0;

    createBtn.addEventListener('click', function () {
      canvas.style.display = "block";
      let img,reader;
      var help = document.getElementById("helper").value;/* helper value is used to consider if random image is selected or file is chosen */
      if (help == 1) {
        document.getElementById("myPicture").style.display = "none";
        img = new Image();
        img.src = document.getElementById("myPicture").src;
        img.onload = function () {
          create(img, toptextInput.value, btmtextInput.value);
        }
      }
      else {
        reader = new FileReader();
        reader.onload = function () {
        img = new Image;
        img.src = reader.result;
        img.onload = function () {
          create(img, toptextInput.value, btmtextInput.value);
        }
      };
      }
      if (imageInput.files[0]) {
        reader.readAsDataURL(imageInput.files[0]);
      }
      else if (document.getElementById("helper").value != 1) {
        alert("Select image");
      }
      document.getElementById("helper").value = 0;
    });
  }
  text();

/* Downloads the meme created on canvas */
  function download_image() {
    var canvas = document.getElementById("canvas");
    if (canvas.width == 0) {
      alert("Create a meme");
      return;
    }
    image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    var link = document.createElement('a');
    link.download = "meme.png";
    link.href = image;
    link.click();
  }
/* Select random image from provided images */
  $("#rand").on("click", function () {
    var arr = ['images/a.jpg', 'images/b.jpg', 'images/c.jpg', 'images/d.jpg', 'images/e.jpg', 'images/f.png', 'images/g.jpg', 'images/h.jpg','images/i.png'];
    var x = Math.floor(Math.random() * arr.length);
    var image = arr[x];
    document.getElementById("helper").value = 1;
    document.getElementById("myPicture").src = image;
    alert("Random Image is chosen...Now add some text and click create to make a meme");
    document.getElementById("myPicture").style.display = "block";
   var canvas = document.getElementById("canvas");
   var ctx = canvas.getContext('2d');
   ctx.clearRect(0,0,canvas.width,canvas.height);
   canvas.style.display = "none";
  });