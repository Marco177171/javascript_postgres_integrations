// server.js
import { createServer } from "node:http";
import { RenderPageFromBase } from "./application/javascript/user_interface.js"
import { GetAll, GetById } from "./application/javascript/api/parametric.js"

const server = createServer(async (req, res) => {
	// UI renderings
	if (req.url === "/" && req.method === "GET")
		return RenderPageFromBase(res, "index");
	if (req.url === "/view" && req.method === "GET")
		return RenderPageFromBase(res, "example_view");
	
	// Api calls
	if (req.url === "/api/users" && req.method === "GET")
		return GetAll(res, "users");
	if (req.url === "/api/users/:id" && req.method === "GET")
		return GetById(res, "users", 0);

	res.writeHead(404);
	res.end("Not Found");
});

server.listen(3000, () => {
	console.log("Server listening on http://localhost:3000");
});