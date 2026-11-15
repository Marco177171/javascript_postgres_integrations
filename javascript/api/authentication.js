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
		return accounts; // Only return first
	} catch (error) {
		console.error(error);
		throw(error);
	}
}

export async function UserIsAuthenticated(req) {
	const token = req.headers.authorization;
	const cert = fs.readFileSync(process.env.JWT_PUBLIC_KEY, "utf-8");
	// console.log("Verifying token...");
	const decoded = jwt.verify(token, cert, (decoder, err) => {
		if (err)
			return false;
		return true;
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

		// Check if the email was already used
		const accounts = await GetAccountsByEmail(body["email"]);
		if (accounts.length !== 0) {
			res.writeHead(500, {
				"Content-type": "application/json"
			});
			res.end(JSON.stringify({
				"Error": "An account for the provided email exists already"
			}));
			return ;
		}

		await sql`
			INSERT INTO accounts
			(email, password)
			VALUES (${body["email"]}, ${hashed_password})
			ON CONFLICT DO NOTHING;
		`;
		res.writeHead(200, {
			"Content-Type": "application/json",
		});
		res.end(JSON.stringify({
			"Registration": "User was registered"
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

export async function Login(req, res) {
	try {
		const chunks = [];
		for await (const chunk of req)
			chunks.push(chunk);

		const body = JSON.parse(Buffer.concat(chunks));
		if (RejectEmptyBodies(body, res) === false)
			return ;

		const accounts = await GetAccountsByEmail(body["email"]);
		if (accounts.length === 0) {
			res.writeHead(404, {
				"Content-Type": "application/json",
			});
			return res.end(JSON.stringify({
				"Error": "Account not found"
			}));
		}

		// Load hash from your password DB
		const passwordCorrect = await bcrypt.compare(
			body["password"],
			accounts[0].password
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
		const token = jwt.sign({ email: accounts[0].email }, privateKey, { algorithm: 'RS256' });

		res.writeHead(200, {
			"Content-Type": "application/json",
		});
		res.end(JSON.stringify({
			"access_token": `${token}`,
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