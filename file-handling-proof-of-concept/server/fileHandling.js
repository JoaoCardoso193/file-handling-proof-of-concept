import { FilesCollection } from "/imports/db/filesCollection";

if (Meteor.isServer) {
  const fs = require("fs");
  const mime = require("mime");
  const sanitize = require("sanitize-filename");
  const process = require("process");

  WebApp.connectHandlers.use("/uploadFile", function (req, res) {
    console.log("upload handler reached");

    fileId = FilesCollection.insert({ name: "file" });
    // console.log(fileId);

    var cwd = process.cwd().match(/.*file-handling-proof-of-concept\//)[0];
    if (cwd.length < 1) {
      console.log("COULDN'T FIND WORKING DIRECTORY, COULDN'T UPLOAD FILE");
      return false;
    }
    destinationDirectory = cwd + "../userUploads/";
    console.log(destinationDirectory);
    if (!fs.existsSync(destinationDirectory)) {
      fs.mkdirSync(destinationDirectory);
    }

    var file = fs.createWriteStream(destinationDirectory + fileId + ".pdf");

    file.on("error", function (error) {
      console.log("Error uploading file: ", error);
    });
    file.on("finish", function () {
      res.writeHead(200);
      res.write(fileId); //send back file ID
      res.end(); //end the respone
      //console.log('Finish uploading, time taken: ' + Date.now() - start);
    });

    req.pipe(file); //pipe the request to the file
  });

  WebApp.connectHandlers.use("/retrieveFile", function (req, res) {
    //var start = Date.now()

    console.log("receiving request to retrieve file");
    //console.log(req);
    fileId = sanitize(req.url);
    console.log("fileId on server side is: ", fileId);

    filePath = fileId + ".pdf";

    var cwd = process.cwd().match(/.*file-handling-proof-of-concept\//)[0];
    if (cwd.length < 1) {
      console.log("COULDN'T FIND WORKING DIRECTORY, COULDN'T RETRIEVE FILE");
      return false;
    }
    destinationDirectory = cwd + "../userUploads/";

    console.log("file to read from:", destinationDirectory + filePath);

    console.log("file exists:", fs.existsSync(destinationDirectory + filePath));

    // var data = fs.readFileSync(destinationDirectory + filename);
    var file = fs.createReadStream(destinationDirectory + filePath);

    //console.log("file:", file);

    // res.writeHead(200, {
    //   "Content-Type": mime.lookup(fileId),
    // });
    //res.write(data);
    //res.end();

    file.pipe(res);

    // var file = fs.createWriteStream('/tmp/tempfilename');
    //
    // file.on('error',function(error){
    //   console.log("Error uploading file");
    // });
    // file.on('finish',function(){
    //     res.writeHead(200)
    //     res.end(); //end the respone
    //     //console.log('Finish uploading, time taken: ' + Date.now() - start);
    // });
    //
    // req.pipe(file); //pipe the request to the file
  });
}
