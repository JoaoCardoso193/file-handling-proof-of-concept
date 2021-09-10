<script>
    export let key;

    $: url = null;
    $: showFile = false;
    $: buttonText = "Show File";

    buttonTextDict = {
        "Show File": "Hide File",
        "Hide File": "Show File",
    }

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
    }

    getFile(key);
    
    const toggleFile = () => {
        showFile = !showFile;
        buttonText = buttonTextDict[buttonText]
    }

</script>

<div>
    <button on:click|preventDefault={toggleFile}>{buttonText}</button>
    {#if showFile}
        {#if url}
            <div>
                <iframe src={url} title="file" width="600" height="400"></iframe>
            </div>
        {:else}
            <p>No file URL found...</p>
        {/if}
    {/if}
</div>