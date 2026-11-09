// server.js
import { createServer } from "node:http";
import { RenderPageFromBase } from "./public/javascript/user_interface.js"
import { GetAll, GetByID, Post } from "./public/javascript/api/parametric.js"

const server = createServer(async (req, res) => {
	// ManageCachedObjects();
	
	// UI renderings
	if (req.url === "/" && req.method === "GET")
		return RenderPageFromBase(res, "index");
	else if (req.url === "/get_calls" && req.method === "GET")
		return RenderPageFromBase(res, "get_calls");
	else if (req.url === "/post_calls" && req.method === "GET")
		return RenderPageFromBase(res, "post_calls");
	else if (req.url === "/patch_calls" && req.method === "GET")
		return RenderPageFromBase(res, "patch_calls");
	else if (req.url === "/delete_calls" && req.method === "GET")
		return RenderPageFromBase(res, "delete_calls");
	
	// API calls
	
	// > GETs
	else if (req.url.split("?")[0] === "/api/get_all" && req.method === "GET")
		return GetAll(req, res);
	else if (req.url.split("?")[0] === "/api/get_by_id" && req.method === "GET")
		return GetByID(req, res);
	else if (req.url.split("?")[0] === "/api/search" && req.method === "GET")
		return SearchInTable(req, res);
	
	// > POST
	else if (req.url.split("?")[0] === "/api" && req.method === "POST")
		return Post(req, res);
	else if (req.url === "/api/insert" && req.method === "POST")
		return InsertNew(res, "cars", ["brand", "model", "year"], ["Ford", "Mustang", 1964]);

	res.writeHead(404);
	res.end("Not Found");
});

server.listen(3000, () => {
	console.log("Server listening on http://localhost:3000");
});