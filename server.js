// server.js
import { createServer } from "node:http";
import { RenderPageFromBase } from "./public/javascript/user_interface.js"
import { GetAll, GetByID, Post } from "./public/javascript/api/parametric.js"

const server = createServer(async (req, res) => {
	// UI renderings
	if (req.url === "/" && req.method === "GET")
		return RenderPageFromBase(res, "index");
	if (req.url === "/api_calls" && req.method === "GET")
		return RenderPageFromBase(res, "api_calls");
	
	// API calls
	
	// > GET
	if (req.url.split("?")[0] === "/api/get_all" && req.method === "GET")
		return GetAll(req, res);
	if (req.url.split("?")[0] === "/api/get_by_id" && req.method === "GET")
		return GetByID(req, res);
	if (req.url.split("?")[0] === "/api/search" && req.method === "GET")
		return SearchInTable(req, res);
	
	// > POST
	if (req.url.split("?")[0] === "/api" && req.method === "POST")
		return Post(req, res);
	if (req.url === "/api/insert" && req.method === "POST")
		return InsertNew(res, "cars", ["brand", "model", "year"], ["Ford", "Mustang", 1964]);

	res.writeHead(404);
	res.end("Not Found");
});

server.listen(3000, () => {
	console.log("Server listening on http://localhost:3000");
});