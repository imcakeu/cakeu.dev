// Libraries
const http = require("http");
const fs = require("fs");

const host = 'localhost';
const port = 8080;
const server = http.createServer();
server.on("request", (req, res) => {
     if (req.url.startsWith('/media')) {
          try {
               res.end(fs.readFileSync('.'+req.url));
          } 
          catch (err) {
              errorHandler(err);
          }
     }
     else if(req.url.startsWith("/viewer_")){
          const image = req.url.slice(8, req.url.length);
          res.end(pageViewer(image));
     }
     else if(req.url == "/favicon.ico"){
          res.end(fs.readFileSync("./media/icons/favicon.ico"));
     }
     else if(req.url == "/style") {
          res.end(fs.readFileSync("./style.css", "utf-8"));
     }
     else if(req.url == "/gallery"){
          res.end(pageGallery());
     }
     else if(req.url == "/"){
          res.end(fs.readFileSync("./index.html", "utf-8"));
     }   
     else{
          res.end(page404("page not found"));
     }
});

server.listen(port, host, () => {
     console.log(`Server running at http://${host}:${port}/`);
 });

function pageGallery(){
     let files = fs.readdirSync("./media/photo/thumbnail");

     let html = '<!DOCTYPE html><html lang="fr">';
     html += '<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">'
     html += '<link rel="stylesheet" href="/style">';
     html += "<title>cakeu's photos</title></head>";
     html += '<body><br><h1>photo gallery</h1><br><br><br>';
     html += '<div id="photoGallery">';

     for (let f of files) {
          if(f != ".DS_Store"){
               let img = f.slice(0, 3);
               let href = "/viewer_" + img;
               html += '<a href="' + href + '"><img src="/media/photo/thumbnail/' + f + '"></a> ';
          }
     }

     html += '</div><br><br><br>';
     html += '<a href="/">return</a><br><br><br><br>';
     html += '</body></html>';

     return html;
}

function pageViewer(page){
     const imageCount = 27;
     const image = parseInt(page); 

     if(image < 1 || image > imageCount)
          return page404("image not found");

     let html = "<!DOCTYPE html><html lang='fr'>";
     html += "<meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'>";
     html += "<link rel='stylesheet' href='/style'>";
     html += "<title>cakeu's photos</title></head>";
     html += "<body><br><h1>photo viewer</h1><br>";
     html += "<div class='photoViewer'>";
     html += "<a href='/media/photo/original/" + page.toString().padStart(3, '0') + ".jpg' id='largeImage'><img src='/media/photo/compressed/" + page.toString().padStart(3, '0') + ".jpg' id='largeImage'></a><br><br>";
     if(image > 1) 
          html += "<a href='/viewer_" + parseImage(image, "previous") + "' id='navPhotoLeft'> <img src='/media/photo/thumbnail/" + parseImage(image, "previous") + ".jpg'></a>";
     if(image < imageCount)
          html += "<a href='/viewer_" + parseImage(image, "next") + "' id='navPhotoRight'> <img src='/media/photo/thumbnail/" + parseImage(image, "next") + ".jpg'></a>";
     html += "</div>";
     html += "<a href='/gallery'>return</a>";
     html += '</body></html>';

     return html;
}

function parseImage(page, type){
     let integer = parseInt(page);

     if(type == "previous") integer -= 1;
     else if(type == "next") integer += 1;

     return integer.toString().padStart(3, '0');
}

function page404(msg){
     let html = "<!DOCTYPE html><html lang='fr'>";
     html += "<head><link rel='stylesheet' href='/style'>";
     html += "<title>cakeu's photos</title></head>";
     html += "<br><h1>error 404</h1>";
     html += "<p>" + msg + " :v</p>"
     html += "<br><a href='/'>return</a>";
     
     errorHandler(msg);
     return html;
}

function errorHandler(err){
     console.log("(!) ERROR: " + err);
}