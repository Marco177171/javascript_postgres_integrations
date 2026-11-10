import sql from "../init_postgres.js";
import allowed_tables from "./permissions.js";

export async function GetAll(req, res) {
	const params = new URLSearchParams(req.url.split("?")[1]);
	try {
		const results = await sql`
			SELECT * 
			FROM ${sql(params.get("table"))};
		`;
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
		res.end(error);
	}
}

export async function GetByID(req, res) {
	const params = new URLSearchParams(req.url.split("?")[1]);
	try {
		const result = await sql`
			SELECT * 
			FROM ${sql(params.get("table"))} 
			WHERE id = ${params.get("id")};
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
		res.end(JSON.stringify({ error: "Errore database" }));
	}
}

export async function Search(req, res) {
	const params = new URLSearchParams(req.url.split("?")[1]);
	
	try {
		const keys = Array.from(params.keys());

		if (!keys.includes("table")) {
			res.writeHead(500, {
				"Content-Type": "application/json",
			});
			res.end("Specify a table with '/api?table=...' in order to search");
			return ;
		}
		if (allowed_tables.includes(params.get("table")) === false) {
			res.writeHead(500, {
				"Content-Type": "application/json",
			});
			res.end("Table not allowed");
			return ;
		}
		
		const conditions = [];
		for (const key of keys) {
			if (key === "table") 
				continue;
			conditions.push(
				sql`${sql(key)} = ${params.get(key)}`
			);
		}
		
		const result = conditions.length > 0 ? 
			await sql`
				SELECT *
				FROM ${sql(params.get("table"))}
				WHERE ${conditions.reduce(
					(acc, condition) => sql`${acc} AND ${condition}`
				)};
			` : 
			await sql`
				SELECT *
				FROM ${sql(params.get("table"))};
			`;
		res.writeHead(200, {
			"Content-Type": "application/json",
		});
		res.end(JSON.stringify(result));
	}
	catch (error) {
		res.writeHead(500, {
			"Content-Type": "application/json",
		});
		res.end(JSON.stringify(error));
	}
}

export async function Post(req, res) {
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

export async function Delete(req, res) {
	const params = new URLSearchParams(req.url.split("?")[1]);
	const chunks = [];

	for await (const chunk of req) {
		chunks.push(chunk);
	}
	const body = JSON.parse(Buffer.concat(chunks));

	const conditions = [];
	for (const [key, value] of Object.entries(body)) {
		if (key === "table") 
			continue;
		conditions.push(
			sql`${sql(key)} = ${value}`
		);
	}

	try {
		const result = await sql`
			DELETE FROM ${sql(params.get("table"))}
			WHERE ${conditions.reduce(
				(acc, condition) => sql`${acc} AND ${condition}`
			)};
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