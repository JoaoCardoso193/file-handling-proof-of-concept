<script>
    import { SourcesCollection } from "/imports/db/sourcesCollection"
    import Source from "/imports/ui/Source"

    let sources = []

    $m: {
        sources = SourcesCollection.find({}).fetch();
        console.log(sources)
    }
</script>

<div>
    <h2>Sources</h2>
    {#each sources as source}
        <Source key={source._id} source={source}/>
    {/each}
</div>