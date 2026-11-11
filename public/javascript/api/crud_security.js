// Body is an Object
export function RejectEmptyBodies(body, res) {
	console.log("Checking the body...");
	if (!Object.entries(body).length) {
		res.writeHead(200, {
			"Content-Type": "application/json",
		});
		res.end(`Error: this request automatically rejects empty bodies.`);
		return false;
	}
}