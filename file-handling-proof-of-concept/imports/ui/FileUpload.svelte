<script>
    import { SourcesCollection } from "/imports/db/sourcesCollection";

	let file;
    let sourceTitle;
    let sourceAuthors;
    let sourceDOI;

    //reactive vars
    $: sourceId = null;
    $: fileId = null; 
	
    //change file on selection
	const onFileSelected = (e) =>{
        console.log('inside onfileselected')
        file = e.target.files[0];
        console.log(file);
    }

    //handles form submit, first creates source object and then uploads file
    const onSubmit = (event) => {
        console.log('submit function triggered')
        event.preventDefault();

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
                    console.log(result);
                    sourceId = result;
                }
            })
        }
    }

    //if source was created succesfully, upload file
    $: if(sourceId){
        console.log('we have a source id!')
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/uploadImage', true);
        xhr.onload = function(event){ console.log("file uploaded"); }
        
        xhr.send(file)
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
            fileId = xhr.responseText;
            }
        }
    }

    //if fileId was created succesfully, save sourceId on fileId 
    $: if(sourceId && fileId){
        SourcesCollection.update(sourceId, {
            $set: { fileId }
        });
    }
    
</script>

<div id="app">
	<h1>Upload Source</h1>
    <form>
        <input type="text" name="title" placeholder="Enter source title" bind:value={sourceTitle}/>
        <input type="text" name="title" placeholder="Enter source Authors" bind:value={sourceAuthors}/>
        <input type="text" name="title" placeholder="Enter source DOI" bind:value={sourceDOI}/>
        <input type="file" accept=".pdf" on:change|preventDefault={(e)=>onFileSelected(e)} />
        <input type="button" value="Submit" on:click|preventDefault={onSubmit}/>
    </form>
</div>
 