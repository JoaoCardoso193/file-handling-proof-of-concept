<script>
    export let key;

    $: url = null;

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

        if(url){
            loadFrame = true;
        }
    }

</script>

<div>
    <button on:click|preventDefault={() => getFile(key)}>Get File</button>
    {#if url}
        <div>
            <iframe src={url} title="file" width="600" height="400"></iframe>
        </div>
    {/if}
</div>