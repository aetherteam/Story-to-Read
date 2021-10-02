const auth = require('../classes/auth.js')

async function routes(fastify, options) {
	fastify.post('/auth/registration/', async (request, reply) => {
		const rp = request.body;
		const userRegStatus = await auth.registration(rp.email, rp.password, rp.passwordConfirmation, rp.username, rp.nickname);

		if (userRegStatus != false) {
			reply.code(200).send({ "success": true })
		}
		else if (userRegStatus === "userExists") {
			reply.code(422).send({ "success": false, "message": "User already exists" })
		}
		else {
			reply.code(500).send({ "success": false, "message": "Internal server error" })
		}
	})
	fastify.get('/auth/login/:login/:password/', async (request, reply) => {
		const rp = request.params;
		
		const userLoginStatus = await auth.login(rp.login, rp.password);

		if (userLoginStatus) {
			reply
				.code(200)
				.send({
					"success": true,
					"userData": {
						"id": userLoginStatus.id,
						"key": userLoginStatus.key
					}
				})
		}
		else {
			reply.code(500).send({ "success": false })
		}
	})
}

module.exports = routes;