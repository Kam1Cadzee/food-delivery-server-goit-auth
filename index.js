const startSever = require("./src/server");

startSever(3000);




/*app.post("/images", upload.any(), (request, response) => {  
  let readableStream = fs.createReadStream(request.files[0].path);
  let writeabeleStream = fs.createWriteStream('./src/db/asdsad.png');
  readableStream.on("data", chunk => {
    writeabeleStream.write(chunk);
  });
})
*/

