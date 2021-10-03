const fs = require('fs');
const mongo = require('../utils/mongodb.js');
const validation = require('../utils/validation');
const Genres = require('./genres.js');
const User = require('./user.js');

// const globalConfig = require('../utils/globalConfig.json');


module.exports = {
    create: async function (name, chapters = [], genres = [], description = "", author) {
        const booksCollection = await mongo.connectWithBooksCollection();

        if (!validation.bookDescription(description) || !validation.basic(name)) {
            console.log("[Book] parameters are wrong")
            return false;
        }

        const _id = await mongo.getIDForNewEntry("books");

        const book = {
            _id,
            name,
            chapters,
            genres,
            description,
            author
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
    addChapter: async function (parentID, name, content, userID) {
        const booksCollection = await mongo.connectWithBooksCollection();
        const haveRights = await module.exports.checkOwnership(parentID, userID);

        if (!validation.chapterContent(content) || !validation.basic(name)) {
            console.log("[Chapter] Fields are invalid");
            return false;
        }

        if (!haveRights) {
            console.error("[Book] User have no rights to create chapter for", parentID);
            return "forbidden";
        }

        const chapter = {
            _id: await mongo.getIDForNewEntry("chapters"),
            parentID,
            name,
            content,
            author: userID
        }

        if (await chaptersCollection.insertOne(chapter)) {
            const book = await booksCollection.findOne({ "_id": parseInt(bookID) });

            booksCollection.updateOne(
                { "_id": parseInt(bookID) },
                { $set: { "chapters": [...book["chapters"], chapterID] } }
            );
            return chapter;
        }
        return false;

    },
    getChapterInfo: async function (chapterID) {
        const chaptersCollection = await mongo.connectWithChaptersCollection();
        const chapter = chaptersCollection.findOne({ "_id": parseInt(chapterID) },{ projection: { content: 0, author: 0 }} );

        return chapter;
    },
    get: async function (bookID) {
        const chaptersCollection = await mongo.connectWithChaptersCollection();
        const booksCollection = await mongo.connectWithBooksCollection();

        let book = await booksCollection.findOne({ "_id": parseInt(bookID) });

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

        return book;
    }
}