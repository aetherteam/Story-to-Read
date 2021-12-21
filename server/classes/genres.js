module.exports = {
    getByID: async function(id) {
        const genresCollection = global.mongo.collection('genres');

        return await genresCollection.findOne({"id": id});
    },
    getAll: async function() {
        const genresCollection = global.mongo.collection('genres');
        return await genresCollection.find();
    }
}