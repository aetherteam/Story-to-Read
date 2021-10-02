const { getUserWithKey } = require("../classes/user")

let keyToID = async (fn, request) => {
    const id = await getUserWithKey(request.body.key);

    if (!id) {
        return false;
    }

    const result = await fn(request, userId=id["_id"])

    return result;
}

module.exports = keyToID