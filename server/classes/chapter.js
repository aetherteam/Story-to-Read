const mongo = require('../utils/mongodb.js');
const Book = require("../classes/book.js");
const validation = require('../utils/validation.js');

module.exports = {
    create: async function (parentID, name, content, userID) {
        const chaptersCollection = await mongo.connectWithChaptersCollection();
        const haveRights = await Book.checkOwnership(parentID, userID);

        if (!validation.chapterContent(content) || !validation.basic(name)) {
            console.log("[Chapter] Fields are invalid");
            return false;
        }

        if (!haveRights) {
            console.error("[Chapter] User have no rights to create chapter for", parentID);
            return "forbidden";
        }

        const _id = await mongo.getIDForNewEntry("chapters");

        const chapter = {
            _id,
            parentID,
            name,
            content,
            owner: userID
        }

        const result = await chaptersCollection.insertOne(chapter);

        if (result) {
            Book.addChapter(parentID, _id);
            return chapter;
        }
        return false;
    }
}