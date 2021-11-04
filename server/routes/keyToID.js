const { getUserWithKey } = require("../classes/user");
const results = require("../utils/results");

let keyToID = async (fn, request) => {
    const id = await getUserWithKey(request.body.key);

    if (!id) {
        return results.error("User not exists", 400);
    }

    const result = await fn(request, userID=id["_id"])

    return result;
}

module.exports = keyToID;