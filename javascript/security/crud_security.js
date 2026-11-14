import { allowed_tables } from "./permissions.js";

export function RejectEmptyBodies(body, res) {
	if (Object.entries(body).length === 0) {
		res.writeHead(400, {
			"Content-Type": "application/json",
		});
		res.end("This operation requires a body to be specified.");
		return false;
	}
	return true;
}

export function CheckParams(params, res) {
	// Is a table specified?
	if (params.get("table") === null || 
		params.get("table" === undefined)) {
		res.writeHead(400, {
			"Content-Type": "application/json",
		});
		res.end(JSON.stringify({
			"Error": "This operation requires 'api?table=...' to be specified."
		}));
		return false ;
	}
	// Is the table allowed?
	if (allowed_tables.includes(params.get("table")) === false) {
		res.writeHead(500, {
			"Content-Type": "application/json",
		});
		res.end(JSON.stringify({
			"Error": "Table not allowed"
		}));
		return false ;
	}
	return true;
}

// Check for EDITing actions : does the object exist?
export async function DoEntriesExist(params, conditions, res) {
	const entries = await sql`
		SELECT * FROM ${sql(params.get("table"))}
		WHERE ${conditions.reduce(
			(acc, condition) => sql`${acc} AND ${condition}`
		)};
	`;
	if (entries.length === 0) {
		res.writeHead(500, {
			"Content-type": "application/json"
		});
		res.end(JSON.stringify({
			"Error": "No object found."
		}));
		return false ;
	}
	return true ;
}
