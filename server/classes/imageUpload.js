const results = require('../utils/results');
const fs = require("fs");
const jimp = require("jimp");
const User = require("../classes/user");
const Book = require("../classes/book");
const { fromBuffer } = require("file-type");
const results = require("../utils/results");

async function upload(request, reply) {
    try {
        const uploadValue = await request.body.upload.toBuffer();
    }
    catch (err) {
        reply.code(400).send({success: false, message: "File must be smaller than 3 Megabytes" });
    }
    const uploadFileName = await request.body.upload.filename;
    const body = parseBodyToObject(request.body);
    const user = await User.getUserWithKey(body.key);

    const tempFilePath = "./temp/" + user["_id"] + uploadFileName;

    fs.writeFileSync(tempFilePath, uploadValue);
    if (body.type === "avatar") {
        const newFilePath = "./uploads/avatars/" + user["_id"] + ".png";

        jimp.read(tempFilePath, function (err, image) {
            if (err) {
                return results.unexpectedError();
            } else {
                fs.unlinkSync(newFilePath);
                image.write(newFilePath);
                fs.unlinkSync(tempFilePath);  
                return results.success();
            }
        });
    } else if (body.type === "cover") {
        const newFilePath = "./uploads/covers/" + body.bookID + ".png";

        jimp.read(tempFilePath, function (err, image) {
            if (err) {
                return results.unexpectedError();
            } else {
                fs.unlinkSync(newFilePath);
                image.write(newFilePath);
                fs.unlinkSync(tempFilePath);
                return results.success();
            }
        });
    } else {
        return results.error("Bad data", 403);
    }
}
// TODO: create delete upload function

async function checkArguments(request, reply) {
    const body = parseBodyToObject(request.body);
    const uploadValue = await request.body.upload.toBuffer();

    const user = await User.getUserWithKey(body.key);

    if (!user) {
        return results.error("You have no access to this method", 403);
    }

    if (!uploadValue) {
        return results.error("You have not uploaded a file", 400)
    }

    const fileType = await fromBuffer(uploadValue);
    if (!/(image)/.test(fileType.mime)) {
        return results.error("File must be an image", 422);
    }

    if (body.type === "cover") {
        if (!body.bookID) {
            return results.error("You have not specified a book ID", 400)
        }

        if (!(await Book.checkOwnership(body.bookID, user["_id"]))) {
            return results.error("You have no permossion to upload cover for this book", 403)
        }
    }

    const result = await upload(request, reply);

    return result;
}


function parseBodyToObject(_body) {
    const body = Object.fromEntries(
        Object.keys(_body).map((key) => [key, _body[key].value])
    );
    return body;
}


module.exports = checkArguments;