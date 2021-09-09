<script>
    import { SourcesCollection } from "/imports/db/sourcesCollection";

    let sourceTitle;
    let sourceAuthors;
    let sourceDOI;
    let fileId;
    let sourceId;
    let file;

    //reactive vars
    // $: file = null;
    // $: sourceId = null;
    // $: fileId = null; 
	
    //change file on selection
	const onFileSelected = (event) =>{
        file = event.target.files[0];
    }

    //change file on drag & drop
    const onFileDragged = (event) => {
        // Prevent default behavior (Prevent file from being opened)
        event.preventDefault();

        if (event.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s) - If multiple files, acces the first one only
            if (event.dataTransfer.items[0].kind === 'file') {
                file = event.dataTransfer.items[0].getAsFile();
            }
        }
    }

    //handle dragover
    const onDragOver = (event) => {
        event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
    }

    //handles form submit, first creates source object and then uploads file
    const onSubmit = (event) => {

        if(!file){
            throw new Meteor.Error('No File Selected');
        }

        //create source object
        else{
            Meteor.call('prepForFileUpload', sourceTitle, sourceAuthors, sourceDOI, function(error, result) {
                if(error){
                    console.log("error: ", error);
                }

                if(!error && result){
                    console.log("source created, source id:", result);
                    sourceId = result;
                }
            })
        }
    }

    //ideally, for consistency, this would be a server-side method, but it appears that this XMLHTTPRequest logic is only applicable on the client
    //in the future, a server-side alternative could be explored
    const uploadFile = () => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/uploadImage', true);
        xhr.send(file)
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                fileId = xhr.responseText;

                //if file not uploaded succesfully, delete source object
                if (!fileId){
                    console.log("error on file upload")
                    deleteSource(sourceId);
                }
                //if both objects created succesfully, associate them by saving fileId on source object
                else{
                    console.log("file uploaded, file id: ", fileId)
                    associateFileToSource(sourceId, fileId);
                }
            }
        }

    }

    const associateFileToSource = (sourceId, fileId) => {
        SourcesCollection.update(sourceId, {
            $set: {fileId}
        });
        console.log("objects associated")
    }

    const deleteSource = (sourceId) => {
        SourcesCollection.remove(sourceId);
        console.log("source object removed")
    }

    //if source was created succesfully, upload file
    $: if(sourceId){
        uploadFile();
    }

    $m: {
        console.log("file: ", file);
    }
    
</script>

<div id="app">
	<h1>Upload Source</h1>
    <form>
        <input type="text" name="title" placeholder="Enter source title" bind:value={sourceTitle}/>
        <input type="text" name="title" placeholder="Enter source Authors" bind:value={sourceAuthors}/>
        <input type="text" name="title" placeholder="Enter source DOI" bind:value={sourceDOI}/>
        <br/>
        <input type="file" accept=".pdf" on:change|preventDefault={(event)=>onFileSelected(event)} />
        <p>OR</p>
        <div id="drop_zone" on:drop|preventDefault={(event) => onFileDragged(event)} on:dragover|preventDefault={onDragOver}>
            {#if !file}
                <p>Drag & drop file to upload here</p>
            {:else}
                <p>File selected: {file.name}</p>
            {/if}
        </div>
        <input type="button" value="Submit" on:click={onSubmit}/>
    </form>


</div>

<style>

#drop_zone {
  border: 5px solid grey;
  width:  100;
  height: 100px;
}

</style>
 