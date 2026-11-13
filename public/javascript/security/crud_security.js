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

export function CheckParams(params_array, res) {
	if (!params_array.includes("table")) {
		res.writeHead(400, {
			"Content-Type": "application/json",
		});
		res.end("This operation requires api?table=... to be specified.");
		return false ;
	}
	return true;
}
