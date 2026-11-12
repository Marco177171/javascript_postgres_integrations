import sql from "../init_postgres.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { RejectEmptyBodies } from "./crud_security.js";

async function GetAccountsByEmail(email) {
	try {
		const accounts = await sql`
			SELECT * 
			FROM accounts 
			WHERE email = ${email}
		;`;
		return accounts[0]; // Only return first
	} catch (error) {
		console.error(error);
		throw(error);
	}
}

export async function Registration(req, res) {
	try {
		const chunks = [];
		for await (const chunk of req) {
			chunks.push(chunk);
		}
		const body = JSON.parse(Buffer.concat(chunks));
		if (RejectEmptyBodies(body, res) === false)
			return ;

		console.log(`Password: ${body["password"]}`);

		// hash the password
		const salt = await bcrypt.genSalt(10);
		const hashed_password = await bcrypt.hash(body["password"], salt);
		console.log(`Hashed passwword: ${hashed_password}. Length = ${hashed_password.length}`);

		const result = await sql`
			INSERT INTO accounts
			(email, password)
			VALUES (${body["email"]}, ${hashed_password})
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
	try {
		const chunks = [];
		for await (const chunk of req)
			chunks.push(chunk);
		
		const body = JSON.parse(Buffer.concat(chunks));
		if (RejectEmptyBodies(body, res) === false)
			return ;

		const account = await GetAccountsByEmail(body["email"]);
		if (!account) {
			res.writeHead(404, {
				"Content-Type": "application/json",
			});
			return res.end(JSON.stringify("Account not found"));
		}

		// Load hash from your password DB
		const passwordCorrect = await bcrypt.compare(
			body["password"],
			account.password
		);

		if (!passwordCorrect) {
			res.writeHead(401, {
				"Content-Type": "application/json",
			});
			return res.end(JSON.stringify({ 
				error: "Invalid credentials." 
			}));
		}
		res.writeHead(200, {
			"Content-Type": "application/json",
		});
		res.end(`Login correct.`);
	}
	catch (error) {
		console.error(error);
		res.writeHead(500, {
			"Content-Type": "application/json",
		});
		res.end(JSON.stringify({ error }));
	}
}