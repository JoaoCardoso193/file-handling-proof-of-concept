<script>
    export let key;
    export let source;
    import FileDisplay from "/imports/ui/FileDisplay"
    import { Meteor } from "meteor/meteor";

    let username = "";
    let fileId = "";

    $m: {
        console.log(source.createdBy)
        username = Meteor.users.findOne({_id: source.createdBy}).username;
        fileId = source.fileId;
    }
</script>

<div>
    <h3>Title: {source.title}</h3>
    <br />
    <p>Uploaded by: {username}</p>
    <br />
    <p>Authors: {source.authors}</p>
    <br />
    <p>DOI: {source.DOI}</p>
    {#if fileId}
        <FileDisplay key={fileId} />
    {/if}
</div>