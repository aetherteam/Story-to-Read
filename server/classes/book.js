const fs = require('fs');
const mongo = require('../utils/mongodb.js');
const validation = require('../utils/validation');
const Genres = require('./genres.js');
const User = require('./user.js');
const results = require('../utils/results.js');

// TODO: const globalConfig = require('../utils/globalConfig.json');

module.exports = {
    create: async function (name, chapters = [], genres = [], description = "", author) {
        const booksCollection = global.mongo.collection("books");

        if (!validation.bookDescription(description) || !validation.basic(name)) {
            console.error("[Book] parameters are wrong")
            return results.error("Some parameters are invalid", 400)
        }

        const _id = await mongo.getIDForNewEntry("books");

        const book = {
            _id,
            name,
            chapters,
            genres,
            description,
            author,
            timestamp: Date.now()
        };

        console.log("[Book] creating", book)
        const result = booksCollection.insertOne(book);

        if (result) {
            console.log("[Book] created")
            return results.successWithData(book);
        }

        return results.error("Unexpected error", 500);
    },
    checkOwnership: async function (bookID, userID) {
        const booksCollection = global.mongo.collection('books');
        const book = await booksCollection.findOne({ "_id": parseInt(bookID) });

        console.log(book, userID)
        return book["author"] === userID;
    },
    addChapter: async function (bookID, name, content, author) {
        const booksCollection = global.mongo.collection('books');
        const chaptersCollection = global.mongo.collection('chapters');

        const doUserHaveRights = await module.exports.checkOwnership(bookID, author);

        if (!validation.chapterContent(content) || !validation.basic(name)) {
            console.log("[Chapter] Fields are invalid");
            return false;
        }

        if (!doUserHaveRights) {
            console.error("[Book] User have no rights to create chapter for", bookID);
            return results.error("Forbidden", 403);
        }

        const chapterID = await mongo.getIDForNewEntry("chapters");
        const chapter = {
            _id: chapterID,
            bookID,
            name,
            content,
            author,
            timestamp: Date.now()
        }

        if (await chaptersCollection.insertOne(chapter)) {
            const book = await booksCollection.findOne({ "_id": parseInt(bookID) });

            booksCollection.updateOne(
                { "_id": parseInt(bookID) },
                { $set: { "chapters": [...book["chapters"], chapterID] } }
            );
            return results.successWithData(chapter);
        }
        return results.unexpectedError();

    },
    getChapter: async function (chapterID) {
        const chaptersCollection = global.mongo.collection("chapters");
        const chapter = chaptersCollection.findOne({ "_id": parseInt(chapterID) },{ projection: { content: 0, author: 0 }} );

        return chapter;
    },
    get: async function (bookID) {
        const chaptersCollection = global.mongo.collection("chapters");
        const booksCollection = global.mongo.collection("chapters");

        let book = await booksCollection.findOne({ "_id": parseInt(bookID) });

        if (!book) {
            return results.error("Book not found", 400)
        }

        let chapters = [];
        await book.chapters.forEach(async (chapterID) => {
            let k = await module.exports.getChapterInfo(chapterID);
            chapters.push(k);
        })

        let genres = [];
        await book.genres.forEach(async (genreID) => {
            let x = await Genres.getByID(genreID);
            genres.push(x);
        })

        if (fs.existsSync(`./uploads/covers/${bookID}.png`)) {
            book.cover = `./uploads/covers/${bookID}.png`;
        }
        else {
            book.cover = `./uploads/covers/regular.png`;
        }

        const author = await User.get(book.author);

        book.chapters = chapters;
        book.genres = genres;
        book.author = author;

        return results.successWithData(book);
    }
}

