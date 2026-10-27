import { table } from "node:console";
import sql from "../db.js";

export async function GetAll(res, table_name) {
	try {
		const results = await sql`SELECT * FROM ${sql(table_name)}`;
		res.writeHead(200, {
			"Content-Type": "application/json",
		});
		res.end(JSON.stringify(results));
	}
	catch (error) {
		console.error(error);
		res.writeHead(500, {
			"Content-Type": "application/json",
		});
		res.end(JSON.stringify({ error: "Errore database" }));
	}
}

export async function GetById(res, table_name, id) {
	try {
		const result = await sql`SELECT * FROM ${sql(table_name)} WHERE id = ${id}`;
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