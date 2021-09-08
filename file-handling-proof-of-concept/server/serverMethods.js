import { SourcesCollection } from "/imports/db/sourcesCollection";

Meteor.methods({
  prepForFileUpload: function (sourceTitle, sourceAuthors, sourceDOI) {
    let user = Meteor.user();

    if (user) {
      //check DOI
      console.log(sourceDOI);
      console.log(SourcesCollection.findOne({ DOI: sourceDOI }));
      if (SourcesCollection.findOne({ DOI: sourceDOI })) {
        throw new Meteor.Error("Source with same DOI already exists");
      } else {
        console.log("inserting new source!");
        newSourceId = SourcesCollection.insert({
          createdBy: user._id,
          title: sourceTitle,
          authors: sourceAuthors,
          DOI: sourceDOI,
        });

        console.log(newSourceId);

        return newSourceId;
      }
    } else {
      throw new Meteor.Error("Not authorized");
    }
  },
});
