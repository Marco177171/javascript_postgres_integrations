import { request } from "node:http";
import sql from "../init_postgres.js";

export async function GetAll(req, res) {
	const params = new URLSearchParams(req.url.split("?")[1]);
	try {
		const results = await sql`SELECT * FROM ${sql(params.get("table"))}`;
		res.writeHead(200, {
			"Content-Type": "application/json",
		});
		res.end(JSON.stringify(results));
		return (results); // Array format
	}
	catch (error) {
		console.error(error);
		res.writeHead(500, {
			"Content-Type": "application/json",
		});
		res.end(error);
	}
}

export async function GetByID(req, res) {
	const params = new URLSearchParams(req.url.split("?")[1]);
	// console.log("Params: ", params);
	try {
		const result = await sql`SELECT * FROM 
			${sql(params.get("table"))} 
			WHERE id = ${params.get("id")}`;
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
		res.end(JSON.stringify({ error: "Errore database" }));
	}
}

export async function SearchInTable(req, res) {
	const params = new URLSearchParams(req.url.split("?")[1]);
	// console.log("Params: ", params);
	try {
		const result = await sql`SELECT * FROM 
			${sql(params.get("table"))} 
			WHERE ...`; // Serialize parameters
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
		res.end(JSON.stringify({ error: "Errore database" }));
	}
}

export async function Post(req, res) {
	const params = new URLSearchParams(req.url.split("?")[1]);
	try {
		const result = await sql`INSERT INTO
			${sql(params.get("table"))} (name, surname, email, password)
			VALUES ('Jenny', 'Penflix', 'jenny@email.com', 'password')
			ON CONFLICT DO NOTHING;`;
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
		res.end(JSON.stringify({ error: "Errore database" }));
	}
}

export async function InsertNew(res, table_name, columns) {
	try {
		const result = await sql`INSERT INTO 
			${sql(table_name)} (brand, model, year)
			VALUES ('Ford', 'Mustang', 1964);`;
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
		res.end(JSON.stringify({ error: "Errore database" }));
	}
}