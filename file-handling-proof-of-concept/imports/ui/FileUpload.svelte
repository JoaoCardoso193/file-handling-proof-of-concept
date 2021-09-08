<script>
	let file;
    let sourceTitle;
    let sourceAuthors;
    let sourceDOI;
    let fileId;
	
	const onFileSelected = (e) =>{
        console.log('inside onfileselected')
        file = e.target.files[0];
        console.log(file);
        // var xhr = new XMLHttpRequest();
        // xhr.open('POST', '/uploadImage', true);
        // xhr.onload = function(event){ console.log("file uploaded"); }
        // xhr.send(file);    
    }

    const onSubmit = (event) => {
        event.preventDefault();
        console.log('inside onsubmit')
        console.log(event.target)

        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/uploadImage', true);
        xhr.onload = function(event){ console.log("file uploaded"); }
        
        xhr.send(file)
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
            fileId = xhr.responseText;
            alert(fileId);
            }
        }
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
 