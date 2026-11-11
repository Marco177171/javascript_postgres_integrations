import sql from "../init_postgres.js";
import jwt from "jsonwebtoken";
import { RejectEmptyBodies } from "./crud_security.js";

export async function Registration(req, res) {
	const chunks = [];
	
	for await (const chunk of req) {
		chunks.push(chunk);
	}
	const body = JSON.parse(Buffer.concat(chunks));
	if (!RejectEmptyBodies(body, res))
		return ;
	
	// jwt.sign({ foo: 'bar' }, 
	// 	process.env.JWT_SECRET_KEY, 
	// 	{ algorithm: process.env.JWT_ALGORITHM }, 
	// 	function(err, token) {
	// 		console.log("TOKEN:", token);
	// 	}
	// );
	
	try {
		const result = await sql`
			INSERT INTO accounts
			(email, password)
			VALUES (${body["email"]}, ${body["password"]})
			ON CONFLICT DO NOTHING;
		`;
		res.writeHead(200, {
			"Content-Type": "application/json",
		});
		res.end(JSON.stringify(result));
	}
	catch (error) {
		console.error(error);
		res.writeHead(500, {
			"Content-Type": "application/json",
		});
		res.end(JSON.stringify({ error }));
	}
}

export async function Login(req, res) {
	const params = new URLSearchParams(req.url.split("?")[1]);
	const chunks = [];

	for await (const chunk of req) {
		chunks.push(chunk);
	}
	const body = JSON.parse(Buffer.concat(chunks));

	try {
		const result = await sql`
			INSERT INTO ${sql(params.get("table"))}
			${sql(body)}
			ON CONFLICT DO NOTHING;
		`;
		res.writeHead(200, {
			"Content-Type": "application/json",
		});
		res.end(JSON.stringify(result));
	}
	catch (error) {
		console.error(error);
		res.writeHead(500, {
			"Content-Type": "application/json",
		});
		res.end(JSON.stringify({ error }));
	}
}