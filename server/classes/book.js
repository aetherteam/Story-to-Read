const mongo = require('../utils/mongodb.js');
const validation = require('../utils/validation');

module.exports = {
    create: async function (name, chapters = [], genres = [], description = "", owner) {
        if (!validation.bookDescription(description) || !validation.basic(name)) {
            console.log("[Book] parameters are wrong")
            return false;
        }

        const booksCollection = await mongo.connectWithBooksCollection();

        const _id = await mongo.getIDForNewEntry("books");

        const book = {
            _id,
            name,
            chapters,
            genres,
            description,
            owner
        };

        console.log("[Book] creating", book)
        const result = booksCollection.insertOne(book);

        if (result) {
            console.log("[Book] created")
            return book;
        }
        console.log("[Book] everything fucked up")
        return false;
    },
    checkOwnership: async function (bookID, userID) {
        const booksCollection = await mongo.connectWithBooksCollection();

        const book = await booksCollection.findOne({ "_id": parseInt(bookID) });

        console.log(book, userID)
        return book["owner"] === userID;
    },
    get: async function (bookID) {
        const booksCollection = await mongo.connectWithBooksCollection();

        const book = await booksCollection.findOne({ "_id": parseInt(bookID) });

        return book;
    },
    addChapter: async function (bookID, chapterID) {
        const booksCollection = await mongo.connectWithBooksCollection();
        const book = await booksCollection.findOne({ "_id": parseInt(bookID) });

        const result = booksCollection.updateOne(
            { "_id": parseInt(bookID) },
            { $set: { "chapters": [...book["chapters"], chapterID] } }
        );

        return result;
    }
}