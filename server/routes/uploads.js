const fs = require("fs");
const jimp = require("jimp");
const User = require("../classes/user");
const Book = require("../classes/book");
const { fromBuffer } = require("file-type");

async function routes(fastify, options) {
    fastify.post("/upload/", async function (request, reply) {
        // reply.code(500).send({ "success": false, "message": "File should be smaller than 3 Megabytes" });
        checkArguments(upload, request, reply);
    });
}
module.exports = routes;

async function upload(request, reply) {
    const uploadValue = await request.body.upload.toBuffer();
    const uploadFileName = await request.body.upload.filename;
    const body = parseBodyToObject(request.body);
    const user = await User.getUserWithKey(body.key);

    const tempFilePath = "./temp/" + user["_id"] + uploadFileName;

    fs.writeFileSync(tempFilePath, uploadValue);
    if (body.type === "avatar") {
        const newFilePath = "./uploads/avatars/" + user["_id"] + ".png";

        jimp.read(tempFilePath, function (err, image) {
            if (err) {
                reply.code(500).send({ success: false });
            } else {
                fs.unlinkSync(newFilePath);
                image.write(newFilePath);
                fs.unlinkSync(tempFilePath);
                reply.code(200).send();
            }
        });
    } else if (body.type === "cover") {
        const newFilePath = "./uploads/covers/" + body.bookID + ".png";

        jimp.read(tempFilePath, function (err, image) {
            if (err) {
                reply.code(500).send({ success: false });
            } else {
                fs.unlinkSync(newFilePath);
                image.write(newFilePath);
                fs.unlinkSync(tempFilePath);
                reply.code(200).send();
            }
        });
    } else {
        reply.code(433).send();
    }
}
// todo: create delete upload function

async function checkArguments(fn, request, reply) {
    const body = parseBodyToObject(request.body);
    const uploadValue = await request.body.upload.toBuffer();

    const user = await User.getUserWithKey(body.key);

    if (!user) {
        reply
            .code(403)
            .send(replyBuilder(false, { message: "User not exists" }));
        return false;
    }

    if (!uploadValue) {
        reply
            .code(422)
            .send(
                replyBuilder(false, { message: "You have not uploaded a file" })
            );
        return false;
    }

    const fileType = await fromBuffer(uploadValue);
    if (!/(image)/.test(fileType.mime)) {
        reply
            .code(422)
            .send(replyBuilder(false, { message: "File must be an image" }));
        return false;
    }

    if (body.type === "cover") {
        if (!body.bookID) {
            reply
                .code(422)
                .send(
                    replyBuilder(false, {
                        message: "You have not specified a book ID",
                    })
                );
            return false;
        }

        if (!(await Book.checkOwnership(body.bookID, user["_id"]))) {
            reply
                .code(403)
                .send(
                    replyBuilder(false, {
                        message:
                            "You have no permossion to upload cover for this book",
                    })
                );
            return false;
        }
    }

    const result = await fn(request, reply);

    return result;
}

function replyBuilder(status, payload) {
    return {
        success: status,
        ...payload,
    };
}

function parseBodyToObject(_body) {
    const body = Object.fromEntries(
        Object.keys(_body).map((key) => [key, _body[key].value])
    );
    return body;
}
