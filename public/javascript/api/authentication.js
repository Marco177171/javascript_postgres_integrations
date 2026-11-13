import sql from "../init_postgres.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import fs from "fs";
import { RejectEmptyBodies } from "../security/crud_security.js";

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

export function UserIsAuthenticated(req) {
	// Get token from the request
	const token = req.headers.authorization;

	// verify a token asymmetric
	const cert = fs.readFileSync(process.env.JWT_PUBLIC_KEY, "utf-8");
	console.log(cert);
	jwt.verify(token, cert, function(err, decoded) {
		if (err) {
			console.error(err);
			return false;
		} else {
			console.log(decoded);
			return true;
		}
	});
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
		if (!body["email"] || !body["password"] || 
			body["email"] === undefined || body["password"] === undefined) {
			console.error(error);
			res.writeHead(500, {
				"Content-Type": "application/json",
			});
			res.end(JSON.stringify({
				"Error": "Both email and password must be provided"
			}));
			return ;
		}

		// hash the password
		const salt = await bcrypt.genSalt(10);
		const hashed_password = await bcrypt.hash(body["password"], salt);

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
				"Content-Type": "application/text",
			});
			return res.end("Account not found");
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
		
		// JWT Generation
		// sign with RSA SHA256
		const privateKey = fs.readFileSync(process.env.JWT_PRIVATE_KEY, "utf8");
		const token = jwt.sign({ email: account.email }, 
			privateKey, 
			{ algorithm: 'RS256' }
		);

		res.writeHead(200, {
			"Content-Type": "application/json",
		});
		res.end(JSON.stringify({
			"access_token": token,
			"token_type": "Bearer",
			"expires_in": 3600
		}));
	}
	catch (error) {
		console.error(error);
		res.writeHead(500, {
			"Content-Type": "application/json",
		});
		res.end(JSON.stringify({ error }));
	}
}