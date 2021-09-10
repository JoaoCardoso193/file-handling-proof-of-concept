<script>
    export let key;
    export let source;
    import FileDisplay from "/imports/ui/FileDisplay"
    import { Meteor } from "meteor/meteor";

    let username = "";

    $m: {
        console.log(source.createdBy)
        username = Meteor.users.findOne({_id: source.createdBy}).username;
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
    <FileDisplay key={source.fileId} />
</div>