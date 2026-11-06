// server.js
import { createServer } from "node:http";
import { RenderPageFromBase } from "./public/javascript/user_interface.js"
import { GetAll, GetByID, InsertNew } from "./public/javascript/api/parametric.js"

const server = createServer(async (req, res) => {
	// UI renderings
	if (req.url === "/" && req.method === "GET")
		return RenderPageFromBase(res, "index");
	if (req.url === "/api_calls" && req.method === "GET")
		return RenderPageFromBase(res, "api_calls");
	
	// Api calls
	if (req.url === "/api/user" && req.method === "POST")
		return NewUser(res, "users");
	if (req.url === "/api/users" && req.method === "GET")
		return GetAll(res, "users");
	if (req.url.split("?")[0] === "/api/query" && req.method === "GET")
		return GetByID(req, res);
	if (req.url === "/api/insert" && req.method === "POST")
		return InsertNew(res, "cars", ["brand", "model", "year"], ["Ford", "Mustang", 1964]);

	res.writeHead(404);
	res.end("Not Found");
});

server.listen(3000, () => {
	console.log("Server listening on http://localhost:3000");
});