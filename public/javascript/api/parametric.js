import { request } from "node:http";
import sql from "../db.js";

export async function GetAll(res, table_name) {
	try {
		const results = await sql`SELECT * FROM ${sql(table_name)}`;
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
	console.log("PARAMS: ", params);

	try {
		const result = await sql`SELECT * FROM ${sql(params.get("table"))} 
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