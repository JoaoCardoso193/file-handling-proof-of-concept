import { FilesCollection } from "/imports/db/filesCollection";

if (Meteor.isServer) {
  const fs = require("fs");
  const mime = require("mime");
  const sanitize = require("sanitize-filename");
  const process = require("process");

  WebApp.connectHandlers.use("/uploadFile", function (req, res) {
    console.log("receiving request to upload file");

    let fileId = FilesCollection.insert({ name: "file" });

    var cwd = process.cwd().match(/.*file-handling-proof-of-concept\//)[0];
    if (cwd.length < 1) {
      console.log("COULDN'T FIND WORKING DIRECTORY, COULDN'T UPLOAD FILE");
      return false;
    }
    destinationDirectory = cwd + "../userUploads/";
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
    });

    req.pipe(file); //pipe the request to the file
  });

  WebApp.connectHandlers.use("/retrieveFile", function (req, res) {
    console.log("receiving request to retrieve file");
    let fileId = sanitize(req.url);
    console.log("fileId on server side is: ", fileId);
    let filePath = fileId + ".pdf";

    var cwd = process.cwd().match(/.*file-handling-proof-of-concept\//)[0];
    if (cwd.length < 1) {
      console.log("COULDN'T FIND WORKING DIRECTORY, COULDN'T RETRIEVE FILE");
      return false;
    }

    destinationDirectory = cwd + "../userUploads/";
    let path = destinationDirectory + filePath;

    console.log("file exists:", fs.existsSync(path));

    var file = fs.createReadStream(path);

    file.pipe(res);
  });
}
