const mongo = require('../utils/mongodb.js');

module.exports = {
    getByID: async function(id) {
        let db = await mongo.connect();
        const genresCollection = db.collection('genres');

        return await genresCollection.findOne({"_id": id});
    },
    getAll: async function() {
        const genresCollection = await mongo.connect().collection('genres');
        return await genresCollection.find();
    }
}