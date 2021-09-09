import { SourcesCollection } from "/imports/db/sourcesCollection";
import { FilesCollection } from "/imports/db/filesCollection";

if (Meteor.isServer) {
  const fs = require("fs");
  const mime = require("mime");
  const sanitize = require("sanitize-filename");
  const process = require("process");

  WebApp.connectHandlers.use("/uploadImage", function (req, res) {
    console.log("handler reached");

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
}
