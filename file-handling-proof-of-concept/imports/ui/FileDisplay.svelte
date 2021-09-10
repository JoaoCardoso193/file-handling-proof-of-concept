<script>
    let file;
    let res;
    let url;
    $: loadFrame = false;
    const fs = require("fs");
    let destinationDirectory = "./files/";

    const getFile = (fileId) => {
        console.log('get file activated with fileId: ' + fileId);
        let xhr = new XMLHttpRequest();
        
        xhr.open('GET', '/retrieveFile/' + fileId, true);
        xhr.responseType = "blob";
        xhr.onload = function(event) {
            if(this.status == 200){
                var blob = new Blob([this.response], {type: 'application/pdf'});
                url = URL.createObjectURL(blob);
                console.log(url)
            }
        };
        xhr.send();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            console.log("response: ", xhr.response);
            // fileDestination = fs.createWriteStream(destinationDirectory + fileId + ".pdf");

            // res.pipe(destinationDirectory)
            // document.getElementById("demo").innerHTML = xhttp.responseText;
            }
        };

        if(url){
            loadFrame = true;
        }

        // xhr.onreadystatechange = function() {
        //     if (xhr.readyState == XMLHttpRequest.DONE) {
        //         fileId = xhr.responseText;

        //         //if file not uploaded succesfully, delete source object
        //         if (!fileId){
        //             console.log("error on file upload")
        //             deleteSource(sourceId);
        //         }
        //         //if both objects created succesfully, associate them by saving fileId on source object
        //         else{
        //             console.log("file uploaded, file id: ", fileId)
        //             associateFileToSource(sourceId, fileId);
        //         }
        //     }
        // }
    }

</script>

<div>
    <h2>Files Displayed Below</h2>
    <button on:click|preventDefault={() => getFile('yRjA95GttJzB6mBxs')}>Get File</button>

        {console.log(url)}
        {console.log(loadFrame)}
        <iframe src={url} title="file"></iframe>
</div>