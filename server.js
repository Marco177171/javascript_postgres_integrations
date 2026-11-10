// server.js
import { createServer } from "node:http";
import { RenderPageFromBase } from "./public/javascript/user_interface.js"
import { 
	GetByID, Search,
	Post, Delete
} from "./public/javascript/api/parametric.js"

const server = createServer(async (req, res) => {
	// ManageCachedObjects();
	
	// UI renderings
	if (req.url === "/docs" && req.method === "GET")
		return RenderPageFromBase(res, "index");
	else if (req.url === "/docs/get" && req.method === "GET")
		return RenderPageFromBase(res, "get");
	else if (req.url === "/docs/post" && req.method === "GET")
		return RenderPageFromBase(res, "post");
	else if (req.url === "/docs/patch" && req.method === "GET")
		return RenderPageFromBase(res, "patch");
	else if (req.url === "/docs/delete" && req.method === "GET")
		return RenderPageFromBase(res, "delete");
	
	// API calls
	
	// > GETs
	else if (req.url.split("?")[0] === "/api/get_by_id" && req.method === "GET")
		return GetByID(req, res);
	else if (req.url.split("?")[0] === "/api" && req.method === "GET")
		return Search(req, res);
	
	// > POSTs
	else if (req.url.split("?")[0] === "/api" && req.method === "POST")
		return Post(req, res);

	// > DELETEs
	else if (req.url.split("?")[0] === "/api" && req.method === "DELETE")
		return Delete(req, res);

	res.writeHead(404);
	res.end("Not Found");
});

server.listen(3000, () => {
	console.log("Server listening on http://localhost:3000");
});